import os
import json
# The decky plugin module is located at decky-loader/plugin
# For easy intellisense checkout the decky-loader code repo
# and add the `decky-loader/plugin/imports` path to `python.analysis.extraPaths` in `.vscode/settings.json`
import decky
import asyncio
from dotenv import load_dotenv
import requests

class Plugin:
    GAME_DATA_PATH = "/home/deck/game.json"

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        self.loop = asyncio.get_event_loop()
        decky.logger.info("Hello World!")

    # Function called first during the unload process, utilize this to handle your plugin being stopped, but not
    # completely removed
    async def _unload(self):
        decky.logger.info("Goodnight World!")
        pass

    # Function called after `_unload` during uninstall, utilize this to clean up processes and other remnants of your
    # plugin that may remain on the system
    async def _uninstall(self):
        decky.logger.info("Goodbye World!")
        pass

    # Migrations that should be performed before entering `_main()`.
    async def _migration(self):
        pass


    async def save_word(self, game_id, game_name, word, translation):
        if not os.path.exists(self.GAME_DATA_PATH):
            json_string = {}
        else:
            with open(self.GAME_DATA_PATH, 'r') as file:
                json_string = json.load(file)
    # If game not exist, auto create a game with specific game ID
        if game_id not in json_string:
                json_string[game_id]= {
                    "game_name": game_name,
                     "words": []
                }

        words_list = json_string[game_id]["words"]
        words_id = len(words_list)

        

        if len(words_list) == 0:
            json_string[game_id]["words"].append( {"id": 1, "word": word, "translation": translation, "starred": False})
            with open (self.GAME_DATA_PATH, "w") as file:
                json.dump(json_string, file, indent=4)
                return json_string 
        else:
            json_string[game_id]["words"].append( {"id": words_id + 1, "word": word, "translation": translation, "starred": False})
            with open (self.GAME_DATA_PATH, "w") as file:
                json.dump(json_string, file, indent=4)
                return json_string
                       
    async def get_words(self, game_id):
        if not os.path.exists(self.GAME_DATA_PATH):
            json_string = {}
        else:
            with open(self.GAME_DATA_PATH, 'r') as file:
                json_string = json.load(file)
                return json_string[game_id]["words"]
    
    async def toggle_star(self, game_id, word_id):
        with open(self.GAME_DATA_PATH, 'r') as file:
                json_string = json.load(file)
        for word in json_string[game_id]["words"]:
            if word["id"] == word_id:
                word["starred"] = not word["starred"]
                break
            # save after loop
        with open(self.GAME_DATA_PATH, 'w') as file:
            json.dump(json_string, file, indent=4)

    async def translate(self, text, target_lang):
        url = "http://100.31.2.116:5000/translate"
        payload = {
            "text": text,
            "target_lang": target_lang
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()["translation"]
        else:
            return f"Error {response.status_code}"

        




