import json
import time
import socket
import requests
import threading
import queue
import asyncio
import websockets
from six.moves import queue
from threading import Event
import json
import wave
from logger_file import get_logger
import random
import uuid

import gi

from logger_file import get_logger

gi.require_version('Gst', '1.0')
from gi.repository import Gst

Gst.init(None)
log = get_logger(process_name="jul16_orpheus_live_server")

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"}

event_listener = True  
class Websocket_Initialize(object):
    def __init__(self, websocket):
        self.websocket = websocket
    
    async def send(self, message):
        try:
            await self.websocket.send(message)
        except websockets.ConnectionClosed:
            print("Connection closed")
        except ConnectionResetError: 
            print("Connection reset by peer")

    async def process_data(self):
        
        value = await self.websocket.recv()
        print('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',value)
        value = json.loads(value)
        print('data_intil_ip_port',value)
        
        ip = value["ip"]
        port = value["port"]
        session_id = value["session_id"]
        ccaasNumber = value["ccaasNumber"]
        server_address_port = (ip, port)
        await self.send("we are getting the ip")
        return server_address_port,session_id,ccaasNumber

    async def process_text_data(self, text_data):
       
        text_data_json = json.loads(text_data)
        print('text_data_json',text_data_json)
        if "text" in text_data_json:
            text= text_data_json["text"]
            status_msg = {
                "status": "Inprogress",
                "error_code": 0,
                "error_message": "Success"
            }
            await self.send(json.dumps(status_msg))
            return text,text_data_json['lang']

        elif "tts_event" in text_data_json:
            text = text_data_json["tts_event"]
            log(f"tts_event...........{text}")
            return text ,False
        
        # elif "sessionId" in text_data_json :
            # session_id =  text_data_json["sessionId"]
            # is_bot =  text_data_json["isBot"]
            # return session_id, is_bot
# class G722RTPStreamer:
#     def __init__(self, DEST_IP, DEST_PORT, CHUNK_DURATION_MS=20):
#         self.pipeline = Gst.Pipeline.new("g722-rtp-pipeline")
#         self.timestamp = 0
#         self.CHUNK_DURATION_MS = CHUNK_DURATION_MS

#         # appsrc: Feed raw PCM 24kHz audio
#         self.appsrc = Gst.ElementFactory.make("appsrc", "src")
#         self.appsrc.set_property("caps", Gst.Caps.from_string(
#             "audio/x-raw,format=S16LE,channels=1,rate=24000,layout=interleaved"))
#         self.appsrc.set_property("format", Gst.Format.TIME)
#         self.appsrc.set_property("is-live", True)
#         self.appsrc.set_property("block", True)
        

        
#         # Audio convert + resample to 16kHz
#         audioconvert = Gst.ElementFactory.make("audioconvert", "convert")
#         audiomixer = Gst.ElementFactory.make("audiomixer","mixer")
#         audiomixer.set_property("latency", 20000000)
        
#         audioresample = Gst.ElementFactory.make("audioresample", "resample")
#         audioresample.set_property("quality",8)
#         # Filter to ensure proper caps for G.722
#         capsfilter = Gst.ElementFactory.make("capsfilter", "filter")
#         capsfilter.set_property("caps", Gst.Caps.from_string(
#             "audio/x-raw,format=S16LE,channels=1,rate=16000"))

#         # G.722 encoder
#         g722enc = Gst.ElementFactory.make("avenc_g722", "g722enc")

#         # Identity element for monitoring after encoding
#         identity = Gst.ElementFactory.make("identity", "identity")
#         identity.set_property("signal-handoffs", True)
#         identity.connect("handoff", self.on_buffer_handoff)

#         # RTP payloader
#         rtppay = Gst.ElementFactory.make("rtpg722pay", "pay")
#         rtppay.set_property("pt", 9)

#         # UDP Sink
#         udpsink = Gst.ElementFactory.make("udpsink", "udpsink")
#         udpsink.set_property("host", DEST_IP)
#         udpsink.set_property("port", DEST_PORT)
#         udpsink.set_property("async", True)
#         udpsink.set_property("sync", False)

#         # Add and link all elements
#         for e in [self.appsrc,audiomixer, audioconvert, audioresample, capsfilter,
#                   g722enc, identity, rtppay, udpsink]:
#             self.pipeline.add(e)

#         self.appsrc.link(audiomixer)
#         audiomixer.link(audioconvert)
#         audioconvert.link(audioresample)
#         audioresample.link(capsfilter)
#         capsfilter.link(g722enc)
#         g722enc.link(identity)
#         identity.link(rtppay)
#         rtppay.link(udpsink)

#         # Bus for error messages
#         bus = self.pipeline.get_bus()
#         bus.add_signal_watch()
#         bus.connect("message::error", self.on_error)

#     def start(self):
#         self.pipeline.set_state(Gst.State.PLAYING)

#     def stop(self):
#         self.pipeline.set_state(Gst.State.NULL)

#     def push_chunk(self, chunk: bytes):
#         buf = Gst.Buffer.new_wrapped(chunk)
#         duration = Gst.util_uint64_scale_int(self.CHUNK_DURATION_MS, Gst.SECOND, 1000)
#         buf.pts = self.timestamp
#         buf.dts = self.timestamp
#         buf.duration = duration
#         self.timestamp += duration
#         self.appsrc.emit("push-buffer", buf)
#         time.sleep(0.02)

#     def on_buffer_handoff(self, identity, buffer):
#         pts = buffer.pts / Gst.SECOND if buffer.pts != Gst.CLOCK_TIME_NONE else 0
#       #   print(f" Encoded Buffer | PTS: {pts:.3f}s | Size: {buffer.get_size()} bytes")

#     def on_error(self, bus, msg):
#         err, dbg = msg.parse_error()
#         print(f" GStreamer Error: {err.message}")
#         if dbg:
#             print(f"    Debug: {dbg}")


class G722RTPStreamer:
    def __init__(self, DEST_IP, DEST_PORT, CHUNK_DURATION_MS=20):
        self.pipeline = Gst.Pipeline.new("g722-rtp-pipeline")
 
        self.CHUNK_DURATION_MS = CHUNK_DURATION_MS
        self.prev_pts = 0
 
        # appsrc
        self.appsrc = Gst.ElementFactory.make("appsrc", "src")
        self.appsrc.set_property("caps", Gst.Caps.from_string(
            "audio/x-raw,format=S16LE,channels=1,rate=24000,layout=interleaved"))
        self.appsrc.set_property("format", Gst.Format.TIME)
        self.appsrc.set_property("is-live", True)
        self.appsrc.set_property("block", True)
        self.appsrc.set_property("do-timestamp", True)  #  Enable auto timestamping
 
        # Conversion
        audioconvert = Gst.ElementFactory.make("audioconvert", "convert")
        audioresample = Gst.ElementFactory.make("audioresample", "resample")
        audioresample.set_property("quality", 8)
 
        audiomixer = Gst.ElementFactory.make("audiomixer", "mixer")
      #   audiomixer.set_property("latency", 20000000)  # 20ms latency buffer
        audiomixer.set_property("output-buffer-duration",20000000)
        audiomixer.set_property("start-time-selection",1)
        audiomixer.set_property("ignore-inactive-pads",True)
 
        # Downsample to 16000Hz for G722
        capsfilter = Gst.ElementFactory.make("capsfilter", "filter")
        capsfilter.set_property("caps", Gst.Caps.from_string(
            "audio/x-raw,format=S16LE,channels=1,rate=16000"))
 
        # G.722 encoder
        g722enc = Gst.ElementFactory.make("avenc_g722", "g722enc")
 
        # Identity to monitor
        identity = Gst.ElementFactory.make("identity", "identity")
        identity.set_property("silent", True)
        identity.set_property("signal-handoffs", True)
        identity.set_property("single-segment", True)
        identity.set_property("sync", True)
        identity.set_property("check-imperfect-timestamp",True)
        identity.connect("handoff", self.on_buffer_handoff)
 
        queue = Gst.ElementFactory.make("queue", "q")
        queue.set_property("leaky", 2)  # 2 = downstream
        queue.set_property("max-size-time", 20000000)
 
       # RTP Payloader
        rtppay = Gst.ElementFactory.make("rtpg722pay", "pay")
        rtppay.set_property("pt", 9)
 
        # UDP Sink
        udpsink = Gst.ElementFactory.make("udpsink", "udpsink")
        udpsink.set_property("host", DEST_IP)
        udpsink.set_property("port", DEST_PORT)
        udpsink.set_property("async", False)
        udpsink.set_property("sync", True)
        
        SOURCE_PORT = self.get_free_udp_port()
        udpsink.set_property("bind-port", SOURCE_PORT)

 
        # Add and link
        for e in [self.appsrc, audiomixer,queue, audioconvert, audioresample, capsfilter,
                  g722enc, identity, rtppay, udpsink]:
            self.pipeline.add(e)
 
        self.appsrc.link(audiomixer)
        audiomixer.link(audioconvert)
        audioconvert.link(audioresample)
        audioresample.link(capsfilter)
        capsfilter.link(g722enc)
        g722enc.link(identity)
        identity.link(queue)
        queue.link(rtppay)
        rtppay.link(udpsink)
 
        # Handle pipeline errors
        bus = self.pipeline.get_bus()
        bus.add_signal_watch()
        bus.connect("message::error", self.on_error)
        
    def get_free_udp_port(self):
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.bind(('', 0))  # OS chooses free port
            return s.getsockname()[1]
 
    def start(self):
        self.pipeline.set_state(Gst.State.PLAYING)
 
    def stop(self):
        print("="*20)
        self.pipeline.set_state(Gst.State.NULL)
        # del self.pipeline
 
    def push_chunk(self, chunk: bytes):
        buf = Gst.Buffer.new_wrapped(chunk)
        self.appsrc.emit("push-buffer", buf)
        time.sleep(self.CHUNK_DURATION_MS / 1000.0)
        #  Removed manual timestamp + sleep
 
 
    def on_buffer_handoff(self, identity, buffer):
        pts = buffer.pts / Gst.SECOND if buffer.pts != Gst.CLOCK_TIME_NONE else 0
        delta = pts - self.prev_pts if self.prev_pts else 0
        self.prev_pts = pts
      #   print(f" Buffer PTS: {pts:.3f}s | Δ: {delta:.3f}s | Size: {buffer.get_size()} bytes")
 
    def on_error(self, bus, msg):
        err, dbg = msg.parse_error()
        # print(f" GStreamer Error: {err.message}")
        if dbg:
            pass
            # print(f"    Debug Info: {dbg}")


class TTS_Initilize():
    def __init__(self,serverAddressPort,websocket,lang,tts_streamer,session_id,ccaasNumber):
        super().__init__()
        self.tts_buff_text = queue.Queue()
        self.tts_buff_text_final_data = queue.Queue()
        self.closed = True
        self.tts_final_data = {}
#         self.speaker_info=speaker_info
        self.language=lang
        self.serverAddressPort=serverAddressPort
        self.websocket=websocket
        self.stop_threading = False
        self.event = Event()
        self.tts_thread = None 
        self.event_listener = True
        self.support_lang_dict= {"en" : 'en',
                                'hi' : 'hi',
                                'ml' : 'ml',
                                'ta' : 'ta',
                                'te' : 'te',
                                'kn' :'kn',
                                'es' : 'es',
                                'it' : 'it',
                                'de' : 'de',
                                'fr' : 'fr',
                                'pt' : 'pt'}#Malayalan ,Kannada
        self.multi_lang = {'en':'Maggie','ml': 'Karthika', 'hi':'Janhvi', 'te': 'Lalita','kn':'Nabha','es' : 'Alejandra','it' : 'Isabella','de' : 'Saskia','fr' : 'Louise','pt':'Margarida'}
        self.api_key_data= 'baqJHJPztt2n975fp2BiO9jzVTSw1VNP4rvfXQ3X'
#         self.sarvam_lang = {'en' : 'en-IN','hi' : 'hi-IN','ml' : 'ml-IN','ta' : 'ta-IN','te' : 'te-IN','kn' :'kn-IN'}
        self.sarvam_lang = {'ta' : 'ta-IN'}
        self.ssrc = random.getrandbits(32)
        self.tts_streamer = tts_streamer
        self.tts_stop = False 
        self.ccaasNumber = ccaasNumber
        self.session_id = session_id

    # def stream_ffplay(self, audio_stream):
    #     for chunk in audio_stream:
    #         if chunk is not None:
    #             yield chunk
    #         else:
    #             break
                
    # def chunk_bytes(self, raw_data: bytes, chunk_size: int):
    #     return [raw_data[i:i + chunk_size] for i in range(0, len(raw_data), chunk_size)]            

         
    # def translation_api(self):
    #     start = time.perf_counter()
    #     log("Entering------translation------------")
    #     print('self.language',self.language)
    #     if self.language != 'en':
    #         print("------not english-----------")
    #         payload = {
    #                         "text1": self.get_text(),
    #                         "source1":"en",
    #                         "target1": self.language
    #                     }
    #         log(f"transalation payload {payload}")
    #         response = requests.post("http://10.150.3.150:8008/translation", json=payload)
    #         #response = requests.post("http://46.43.144.145:8009/translation", json=payload)
    #         response = response.json()
    #         return_data = response[self.language]
    #         inference_time = time.perf_counter()-start

    #         log(f"{inference_time:.3f}s\t{return_data} =======================translation_api_time")
    #         return return_data


    def tts_en(self):
            log('=========================orpheustts=====================================')#
            start = time.perf_counter()
            if self.ccaasNumber == 918925423822:
                res = requests.post("http://173.234.75.165:7024/tts", json={"text": self.get_text(),'session_id':self.session_id}, stream=True)
                log(f'indian TTS start Timeeeeeeeeeeee {start}')
            else:
                 res = requests.post("http://173.234.75.165:7021/tts", json={"text": self.get_text()}, stream=True)
                 log(f'uk TTS start Timeeeeeeeeeeee {start}')   
            # output_filename = "output_streamed.wav"
            # wf = wave.open(output_filename, "wb")
            # wf.setnchannels(1)
            # wf.setsampwidth(2) 
            # wf.setframerate(24000)
            for raw_audio in res.iter_content(chunk_size=4096):
                # print("raw audio recieved : ",len(raw_audio))
            #     wf.writeframes(raw_audio)
            #     raw_audio = self.resample_audio(raw_audio,orig_sr=24000,target_sr=8000)
                yield raw_audio
                

        
             
    async def send(self, message):
        try:
            await self.websocket.send(message)
            log("SEND FINAL MSG===================================2")
        except websockets.ConnectionClosed:
            log("Connection closed")
        except ConnectionResetError:
            log("Connection reset by peer")
    
    def run_asyncio(self):
        asyncio.run(self.send_audio())
        
    def start_thread(self):
        tts_process = threading.Thread(target = self.run_asyncio)
        tts_process.start()

    async def send_audio(self):
        # Initialize the flag to control the loop
        start = time.perf_counter()
        log("Socket server send started")
        udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        udp_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        value = b''
        byte_size = 960
        print("******************************************",self.language)
        if self.language =='en':
            tts_out = self.tts_en()   
        print('------------streaming start-----------------')
        self.tts_streamer.start()

        try:
            for chunk in self.tts_en():
                chunk = value + chunk
                value = b""
                if len(chunk) == 0:
                        continue
                
                if self.tts_stop == True:
                        break
                
                # print("-----------",len(chunk))
                for i in range(0,len(chunk),byte_size):
                        if not self.event_listener:
                            break

                        if len(chunk[i:i+byte_size]) == byte_size:
                            # print("Chunk Length: ",len(chunk[i:i+byte_size]))
                            self.tts_streamer.push_chunk(chunk[i:i+byte_size])

                        else:
                            value+=chunk[i:i+byte_size]
        except Exception as e:
                print("----------",e)
        
        finally:  
                self.tts_streamer.stop()
                udp_socket.close()     
                                   
        if self.event_listener:
            final_json = {
                "status": "Completed",
                "error_code": 0,
                "error_message": "Success"
            }
            final_json_str = json.dumps(final_json)
            time.sleep(0.3)
            await self.send(final_json_str)
            inference_time = time.perf_counter()-start
            log(f"Completed transmission completed.{inference_time}")
            
    def get_text(self):
        tts_text = self.tts_buff_text.get()
        return tts_text



clients = set()

async def handle_client(websocket):
    lang='en'
    websocket_obj = Websocket_Initialize(websocket)
    serverAddressPort,session_id,ccaasNumber = await websocket_obj.process_data()
    print('serverAddressPort',serverAddressPort)
    
    tts_streamer = G722RTPStreamer(serverAddressPort[0],serverAddressPort[1])   
    # tts_streamer.start()

    tts_obj = TTS_Initilize(serverAddressPort,websocket,lang,tts_streamer,session_id,ccaasNumber)
    try:
        async for text_data in websocket:
            log(f"input text {text_data}")
            text,lang = await websocket_obj.process_text_data(text_data)
            print("Language: ",lang)
            

                
            if lang in tts_obj.support_lang_dict:
                lang_data=tts_obj.support_lang_dict[lang]

            else:
                lang_data=tts_obj.support_lang_dict['en']
                
                
            if text==1:
                tts_obj.event_listener = False
                tts_obj.tts_stop = True
                del tts_obj
                tts_obj = TTS_Initilize(serverAddressPort,websocket,lang_data,tts_streamer,session_id,ccaasNumber)
                tts_obj.start_thread()  
            else:
                tts_obj.language = lang_data
                tts_obj.start_thread()
                await asyncio.get_running_loop().run_in_executor(None, tts_obj.tts_buff_text.put,text)                   

    except websockets.exceptions.ConnectionClosedOK as error:
        log(f"<- Client connection finalized{error}." )
    except websockets.ConnectionClosedError as error:
        log(f'Websocket: Client connection failed.{error}')
    except Exception as e:
        log(f"Error: {e}")
    finally:
        clients.remove(websocket)
        await websocket.close()
        # tts_streamer.stop()
        log("Client Remove")


async def audio_processor(websocket):
    clients.add(websocket)
    await handle_client(websocket)

async def start_server():
       async with websockets.serve(audio_processor,"0.0.0.0",7002,ping_interval=10000):
        log("WebSocket server started")
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    async def main():
        try:
            await start_server()
        except KeyboardInterrupt:
            pass
        finally:
            log("WebSocket server stopped")

    asyncio.run(main())