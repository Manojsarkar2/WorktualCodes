from TTS.utils.manage import ModelManager

manager = ModelManager()
model_path, config_path, model_item = manager.download_model("voice_conversion_models/multilingual/vctk/freevc24")
print("Model path:", model_path)
print("Config path:", config_path)
