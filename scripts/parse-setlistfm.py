import glob, re, html, json, os
from datetime import datetime

MAP = {
"Alice":"愛麗絲","Ame no Gairo ni Yakouchuu":"雨の街路に夜光蟲","Atashi wa Yuurei":"あたしはゆうれい","Campanella":"カムパネルラ","Canary":"カナリヤ","Chikyuugi":"地球儀","Cranberry to Pancake":"クランベリーとパンケーキ","Dagashiya Shoubai":"駄菓子屋商売","Decolléte":"Décolleté","Deshomasho":"でしょましょ","Donut Hole":"ドーナツホール","Eine Kleine":"アイネクライネ","Engeki Terpsichora":"演劇テレプシコーラ","Fluorite":"フローライト","Fogbound":"fogbound","Ganpuku":"眼福","Garakuta":"がらくた","Go Go Yuureisen":"ゴーゴー幽霊船","Gomen ne":"ごめんね","Haiiro to Ao":"灰色と青","Hana ni Arashi":"花に嵐","Hien":"飛燕","Hikarabita Bus Hitotsu":"乾涸びたバスひとつ","Himawari":"ひまわり","Hisui no Ookami":"翡翠の狼","Hopeland":"ホープランド","Horafuki Nekoyarou":"ホラ吹き猫野郎","Hyakki Yakou":"百鬼夜行","Kaijyuu no March":"かいじゅうのマーチ","Kanden":"感電","Koi to Byounetsu":"恋と病熱","Kokoro ni Kudamono":"こころにくだもの","Living Dead Youth":"リビングデッド・ユース","Love":"love","Lullaby Sayonara":"ララバイさよなら","Machi":"街","Machigai Sagashi":"まちがいさがし","Mainichi":"毎日","Margherita":"マルゲリータ","Matryoshka":"マトリョシカ","Mayoeru Hitsuji":"迷える羊","Melancholy Kitchen":"メランコリーキッチン","Metronome":"メトロノーム","Mirage Song":"ミラージュソング","Number Nine":"ナンバーナイン","Panda Hero":"パンダヒーロー","Paprika":"パプリカ","Peace Sign":"ピースサイン","Saijouei":"再上映","Sajou no Yume Kui Shoujo":"沙上の夢喰い少女","Sayonara, Mata Itsuka!":"さよーならまたいつか！","Shinigami":"死神","Shitodo Seiten Daimeiwaku":"しとど晴天大迷惑","Shunrai":"春雷","Spider":"スパイダー","Suna no Wakusei":"砂の惑星","Tomaremiyo":"とまれみよ","Toy Patriot":"トイパトリオット","Tsuki wo Miteita":"月を見ていた","Uchiage Hanabi":"打上花火","Uma to Shika":"馬と鹿","Umi no Yuurei":"海の幽霊","Umi to Sanshouuo":"海と山椒魚","Unbelievers":"アンビリーバーズ","Will o' Wisp":"ウィルオウィスプ","Wonderland to Hitsuji no Uta":"ワンダーランドと羊の歌","Yasashii Hito":"優しい人","Yume Utsutsu":"ゆめうつつ","Yuuen Shigai":"遊園市街","Zange no Machi":"懺悔の街"
}
MONTH={m:i for i,m in enumerate(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],1)}
records=[]
for path in glob.glob('/tmp/yonezu-setlists/*'):
    raw=open(path,encoding='utf-8',errors='ignore').read()
    mo=re.search(r'<span class="month">([^<]+)</span>\s*<span class="day">([^<]+)</span>\s*<span class="year">([^<]+)</span>',raw,re.S)
    if not mo: continue
    month,day,year=mo.groups(); year=int(year)
    if year>2025: continue
    headline=re.search(r'<div class="setlistHeadline">(.*?)</div>',raw,re.S)
    venue="会場不明"
    if headline:
        spans=re.findall(r'<span>(.*?)</span>',headline.group(1),re.S)
        if spans: venue=html.unescape(re.sub(r'<.*?>','',spans[-1])).strip().removeprefix('at ')
    tour="単独公演／イベント"
    tm=re.search(r'<span>Tour:</span>\s*<span><a[^>]*><span>(.*?)</span>',raw,re.S)
    if tm: tour=html.unescape(re.sub(r'<.*?>','',tm.group(1))).strip()
    songs=[]; encore=False
    for block in re.split(r'<li class="setlistParts ',raw)[1:]:
        cls=block.split('"',1)[0]
        if cls.startswith('encore'): encore=True; continue
        if not cls.startswith('song'): continue
        sm=re.search(r'<a class="songLabel"[^>]*>(.*?)</a>',block,re.S)
        if sm:
            name=html.unescape(re.sub(r'<.*?>','',sm.group(1))).strip()
            songs.append({"name":MAP.get(name,name),"encore":encore})
    if not songs: continue
    url=os.path.basename(path).replace('https:__www.setlist.fm_','https://www.setlist.fm/',1).replace('_','/')
    records.append({"id":url.rsplit('-',1)[-1].replace('.html',''),"date":f"{year:04}-{MONTH[month]:02}-{int(day):02}","year":year,"title":tour,"venue":venue,"songs":songs,"sourceUrl":url,"sourceName":"setlist.fm"})
records.sort(key=lambda r:r['date'],reverse=True)
print(json.dumps(records,ensure_ascii=False,indent=2))
