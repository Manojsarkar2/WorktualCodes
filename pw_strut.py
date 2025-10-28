from playwright.sync_api import sync_playwright
import json
from pathlib import Path

def extract_dom_structure(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print(f"Visiting: {url}")
        page.goto(url, wait_until="networkidle")

        # Extract full DOM structure with tags and text
        dom_data = page.evaluate(
            """() => {
                function serialize(node) {
                    if (node.nodeType === Node.COMMENT_NODE) return null;
                    if (node.nodeType === Node.TEXT_NODE) {
                        const text = node.textContent.replace(/\\s+/g, ' ').trim();
                        return text ? { type: 'text', text } : null;
                    }
                    if (node.nodeType !== Node.ELEMENT_NODE) return null;

                    const el = node;
                    const obj = {
                        type: 'element',
                        tag: el.tagName.toLowerCase(),
                        attributes: {},
                        text: null,
                        children: []
                    };

                    // collect attributes
                    for (let i = 0; i < el.attributes.length; i++) {
                        const a = el.attributes[i];
                        obj.attributes[a.name] = a.value;
                    }

                    // If only text child, simplify
                    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                        const text = el.childNodes[0].textContent.replace(/\\s+/g, ' ').trim();
                        if (text) obj.text = text;
                        return obj;
                    }

                    // Otherwise recurse
                    for (const child of el.childNodes) {
                        const c = serialize(child);
                        if (c) obj.children.push(c);
                    }

                    return obj;
                }

                const root = document.documentElement || document.body;
                return serialize(root);
            }"""
        )

        browser.close()
        return dom_data


if __name__ == "__main__":
    url = input("Enter website URL (e.g. https://example.com): ").strip()
    if not url.startswith("http"):
        url = "https://" + url

    result = extract_dom_structure(url)

    output_file = Path("dom_snapshot.json")
    output_file.write_text(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\n✅ Extracted homepage DOM saved to: {output_file.resolve()}")
