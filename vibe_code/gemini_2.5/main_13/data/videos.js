export const videos = [
    {
        id: 'v1',
        title: 'Building a Web App with Vanilla JS | Complete Course',
        channelName: 'DevSimplified',
        channelAvatar: 'https://i.pravatar.cc/40?u=devsimplified',
        views: '1.2M',
        timestamp: '1 year ago',
        duration: '4:35:10',
        thumbnailUrl: 'https://i.ytimg.com/vi/3PHXvlpOkf4/hq720.jpg',
        description: 'A deep dive into building modern web applications without any frameworks. Learn about routing, state management, and more!',
        comments: [
            { user: 'CodeMaster', text: 'This is the best vanilla JS tutorial out there!', avatar: 'https://i.pravatar.cc/40?u=codemaster' },
            { user: 'NewbieDev', text: 'Finally, something I can understand. Thanks!', avatar: 'https://i.pravatar.cc/40?u=newbiedev' }
        ]
    },
    {
        id: 'v2',
        title: 'CSS Grid Layout Crash Course 2024',
        channelName: 'Traversy Media',
        channelAvatar: 'https://i.pravatar.cc/40?u=traversy',
        views: '3.5M',
        timestamp: '2 years ago',
        duration: '25:15',
        thumbnailUrl: 'https://i.ytimg.com/vi/jV8B24rSN5o/hq720.jpg',
        description: 'Learn CSS Grid from scratch with this comprehensive crash course.',
        comments: []
    },
    {
        id: 'v3',
        title: 'The Future of Artificial Intelligence',
        channelName: 'Lex Fridman',
        channelAvatar: 'https://i.pravatar.cc/40?u=lex',
        views: '890K',
        timestamp: '3 weeks ago',
        duration: '2:10:45',
        thumbnailUrl: 'https://i.ytimg.com/vi/L_Guz73e6fw/hq720.jpg',
        description: 'A conversation about the future of AI, consciousness, and the nature of reality.',
        comments: [
            { user: 'AI Enthusiast', text: 'Mind-blowing conversation!', avatar: 'https://i.pravatar.cc/40?u=aienthusiast' }
        ]
    },
    {
        id: 'v4',
        title: 'Lofi Hip Hop Radio - Beats to Relax/Study to',
        channelName: 'Lofi Girl',
        channelAvatar: 'https://i.pravatar.cc/40?u=lofigirl',
        views: '1.4B',
        timestamp: 'Live',
        duration: '🔴 LIVE',
        thumbnailUrl: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hq720.jpg',
        description: '24/7 stream of lofi hip hop beats.',
        comments: []
    }
    // Add 16 more video objects to make the page look full
].concat(Array.from({ length: 16 }, (_, i) => ({
    id: `v${i + 5}`,
    title: `Sample Video Title ${i + 5} - Exploring Nature's Wonders`,
    channelName: `Channel ${i + 5}`,
    channelAvatar: `https://i.pravatar.cc/40?u=channel${i + 5}`,
    views: `${Math.floor(Math.random() * 1000)}K`,
    timestamp: `${i + 1} months ago`,
    duration: `${Math.floor(Math.random() * 30)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    thumbnailUrl: `https://picsum.photos/seed/${i + 5}/480/270`,
    description: `This is a sample description for video ${i + 5}.`,
    comments: []
})));
