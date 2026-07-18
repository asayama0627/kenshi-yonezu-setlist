import verified from "./verified-setlists.json";

export type SetlistRecord = { id:string; date:string; title:string; venue:string; year:number; songs:{name:string;encore:boolean}[]; kind:"tour"|"festival"|"event"; sourceUrl:string; sourceName:string };

const NOTE_A="https://note.com/tachikoma919/n/n78dda459e12a";
const early:SetlistRecord[]=[
 {id:"early-20110213",date:"2011-02-13",title:"ニコニコ生放送公開リハーサル",venue:"スタジオ公開配信",year:2011,kind:"event",sourceUrl:NOTE_A,sourceName:"tachikoma / えすとにあ",songs:["マトリョシカ","結んで開いて羅刹と骸","ワンダーランドと羊の歌","パンダヒーロー","沙上の夢喰い少女"].map(name=>({name,encore:false}))},
 {id:"early-20110306",date:"2011-03-06",title:"INTERNET INDEPENDENT MUSIC LIVE FES 2011",venue:"品川プリンス ステラボール",year:2011,kind:"festival",sourceUrl:NOTE_A,sourceName:"tachikoma / えすとにあ",songs:["マトリョシカ","結んで開いて羅刹と骸","ワンダーランドと羊の歌","パンダヒーロー","沙上の夢喰い少女"].map(name=>({name,encore:false}))},
 {id:"early-20140508",date:"2014-05-08",title:"覆面ライブ YANKEE",venue:"渋谷 TSUTAYA O-Crest",year:2014,kind:"tour",sourceUrl:NOTE_A,sourceName:"tachikoma / えすとにあ",songs:["街","百鬼夜行","ホラ吹き猫野郎","WOODEN DOLL"].map(name=>({name,encore:false}))},
 {id:"early-20140513",date:"2014-05-13",title:"YANKEE",venue:"渋谷 eggman",year:2014,kind:"tour",sourceUrl:NOTE_A,sourceName:"tachikoma / えすとにあ",songs:["街","百鬼夜行","ホラ吹き猫野郎","乾涸びたバスひとつ","WOODEN DOLL"].map(name=>({name,encore:false}))},
 {id:"early-20140610",date:"2014-06-10",title:"YANKEE",venue:"新代田 FEVER",year:2014,kind:"tour",sourceUrl:NOTE_A,sourceName:"tachikoma / えすとにあ",songs:["しとど晴天大迷惑","駄菓子屋商売","海と山椒魚","vivi","WOODEN DOLL"].map(name=>({name,encore:false}))},
];
const eventNames:Record<string,string>={
 "2025-12-31":"第76回NHK紅白歌合戦","2024-12-31":"第75回NHK紅白歌合戦","2018-12-31":"第69回NHK紅白歌合戦",
 "2018-12-18":"The Weeknd ASIA TOUR LIVE IN JAPAN","2018-10-28":"米津玄師 2018 LIVE / Flamingo","2018-10-27":"米津玄師 2018 LIVE / Flamingo",
 "2017-07-15":"米津玄師 2017 LIVE / RESCUE","2017-07-14":"米津玄師 2017 LIVE / RESCUE",
 "2016-08-28":"SPACE SHOWER SWEET LOVE SHOWER 2016","2016-08-21":"SUMMER SONIC 2016 TOKYO","2016-08-20":"SUMMER SONIC 2016 OSAKA","2016-08-14":"ROCK IN JAPAN FESTIVAL 2016",
 "2016-07-20":"Spitz × VINTAGE ROCK std. presents 新木場サンセット2016","2016-02-26":"uP!!!NEXT～米津玄師 一夜～",
 "2015-11-04":"RADWIMPS 10th ANNIVERSARY LIVE TOUR","2015-11-02":"RADWIMPS 10th ANNIVERSARY LIVE TOUR","2015-08-28":"SPACE SHOWER SWEET LOVE SHOWER 2015","2015-08-22":"MONSTER baSH 2015","2015-08-14":"RISING SUN ROCK FESTIVAL 2015 in EZO","2015-08-02":"ROCK IN JAPAN FESTIVAL 2015",
 "2014-12-11":"米津玄師 2014 LIVE / 帰りの会・続編","2014-12-04":"米津玄師 2014 LIVE / 帰りの会・続編","2014-12-02":"米津玄師 2014 LIVE / 帰りの会・続編","2014-06-27":"米津玄師 2014 LIVE / 帰りの会",
};
const tourNames:Record<string,string>={"Kuusou":"米津玄師 2023 TOUR / 空想","Sekitsui ga Opal ni Naru Koro":"米津玄師 2019 TOUR / 脊椎がオパールになる頃","Ongakutai":"米津玄師 2016 TOUR / 音楽隊","Henshin":"米津玄師 2022 TOUR / 変身","Hanayuri Ochiru":"米津玄師 2015 TOUR / 花ゆり落ちる","HYPE":"米津玄師 2020 TOUR / HYPE","Howl":"米津玄師 2016 LIVE / はうる"};
const venueNames:Record<string,string>={
 "ASTY Tokushima, Tokushima, Japan":"アスティとくしま（徳島県）","Aichi Sky Expo, Tokoname, Japan":"Aichi Sky Expo（愛知県常滑市）","BIGCAT, Osaka, Japan":"BIGCAT（大阪府）","BLUE LIVE HIROSHIMA, Hiroshima, Japan":"BLUE LIVE 広島（広島県）","Century Hall, Nagoya, Japan":"名古屋国際会議場 センチュリーホール（愛知県）","DRUM LOGOS, Fukuoka, Japan":"DRUM LOGOS（福岡県）","Daiwa House PREMIST DOME, Sapporo, Japan":"大和ハウス プレミストドーム（北海道札幌市）","Electric Lady Land, Nagoya, Japan":"ElectricLadyLand（愛知県名古屋市）","Eventim Apollo, London, England":"イベンティム・アポロ（イギリス・ロンドン）","Festival Hall, Osaka, Japan":"フェスティバルホール（大阪府）","Fukuoka Sunpalace, Fukuoka, Japan":"福岡サンパレス（福岡県）","Grand Messe Kumamoto, Mashiki, Japan":"グランメッセ熊本（熊本県益城町）","Hiroshima CLUB QUATTRO, Hiroshima, Japan":"広島クラブクアトロ（広島県）","Hiroshima Green Arena, Hiroshima, Japan":"広島グリーンアリーナ（広島県）","Hitachi Kaihin Kouen, Hitachinaka, Japan":"国営ひたち海浜公園（茨城県ひたちなか市）","Hokkai Kitayell, Sapporo, Japan":"北海きたえーる（北海道札幌市）","Inspire Arena, Incheon, South Korea":"インスパイア・アリーナ（韓国・仁川）","KYOCERA DOME OSAKA, Osaka, Japan":"京セラドーム大阪（大阪府）","Kagoshima Shimin Bunka Hall, Kagoshima, Japan":"鹿児島市民文化ホール（鹿児島県）","Kobe Kokusai Kaikan, Kobe, Japan":"神戸国際会館こくさいホール（兵庫県）","Kooriyama Shimin Bunka Center, Kooriyama, Japan":"郡山市民文化センター（福島県）","LIQUIDROOM, Tokyo, Japan":"恵比寿LIQUIDROOM（東京都）","Le Zénith, Paris, France":"ル・ゼニス・パリ（フランス・パリ）","Maishima, Osaka, Japan":"舞洲（大阪府）","Makuhari Messe Kokusai Tenjijou, Chiba, Japan":"幕張メッセ 国際展示場（千葉県）","Marine Messe Fukuoka, Fukuoka, Japan":"マリンメッセ福岡（福岡県）","Matsuyama Shimin Kaikan, Matsuyama, Japan":"松山市民会館（愛媛県）","Mercedes-Benz Arena, Shanghai, China":"メルセデス・ベンツアリーナ（中国・上海）","Mizuho PayPay Dome Fukuoka, Fukuoka, Japan":"みずほPayPayドーム福岡（福岡県）","NHK Hall, Tokyo, Japan":"NHKホール（東京都）","NIIGATA LOTS, Niigata, Japan":"新潟LOTS（新潟県）","Nanba Hatch, Osaka, Japan":"なんばHatch（大阪府）","Naruto-shi  Bunka Kaikan, Naruto, Japan":"鳴門市文化会館（徳島県）","National Taiwan University Sports Center, Taipei, Taiwan":"国立台湾大学総合体育館（台湾・台北）","Nihon Gaishi Hall, Nagoya, Japan":"日本ガイシホール（愛知県名古屋市）","Niigata Kenmin Kaikan, Niigata, Japan":"新潟県民会館（新潟県）","Nippon Budokan, Tokyo, Japan":"日本武道館（東京都）","Nitori Bunka Hall, Sapporo, Japan":"ニトリ文化ホール（北海道札幌市）","Okayama Shimin Kaikan, Okayama, Japan":"岡山市民会館（岡山県）","Oomiya Sonic City, Saitama, Japan":"大宮ソニックシティ（埼玉県）","Osaka-jou Hall, Osaka, Japan":"大阪城ホール（大阪府）","PACIFICO Yokohama, Kokuritsu Dai Hall, Yokohama, Japan":"パシフィコ横浜 国立大ホール（神奈川県）","Radio City Music Hall, New York, NY, USA":"ラジオシティ・ミュージックホール（アメリカ・ニューヨーク）","Rensa, Sendai, Japan":"仙台Rensa（宮城県）","STUDIO COAST, Tokyo, Japan":"新木場STUDIO COAST（東京都）","SUNDOME FUKUI, Echizen, Japan":"サンドーム福井（福井県越前市）","Saitama Super Arena, Saitama, Japan":"さいたまスーパーアリーナ（埼玉県）","Sanuki Man-nou Kouen, Man-nou, Japan":"国営讃岐まんのう公園（香川県）","Sekisui Heim Super Arena, Rifu, Japan":"セキスイハイムスーパーアリーナ（宮城県利府町）","Sendai PIT, Sendai, Japan":"仙台PIT（宮城県）","Sun Plaza Hall, Sendai, Japan":"仙台サンプラザホール（宮城県）","TSUTAYA O-EAST, Tokyo, Japan":"TSUTAYA O-EAST（東京都）","Taipei Arena, Taipei, Taiwan":"台北アリーナ（台湾・台北）","Takamatsu Olive Hall, Takamatsu, Japan":"高松オリーブホール（香川県）","Tarukawa Dock Open-Air Special Stages, Ishikari, Japan":"石狩湾新港樽川ふ頭横 野外特設ステージ（北海道）","Toki Messe, Niigata, Japan":"朱鷺メッセ 新潟コンベンションセンター（新潟県）","Tokyo Dome, Tokyo, Japan":"東京ドーム（東京都）","Tokyo Kokusai Forum, Tokyo, Japan":"東京国際フォーラム（東京都）","Tokyo Taiikukan, Tokyo, Japan":"東京体育館（東京都）","Toyosu PIT, Tokyo, Japan":"豊洲PIT（東京都）","UNIT, Tokyo, Japan":"代官山UNIT（東京都）","WORLD Kinen Hall, Kobe, Japan":"神戸ワールド記念ホール（兵庫県）","Wakayama Big Whale, Wakayama, Japan":"和歌山ビッグホエール（和歌山県）","YOKOHAMA ARENA, Yokohama, Japan":"横浜アリーナ（神奈川県）","Yamanakako Kouryuu Plaza Kirara, Yamanakako, Japan":"山中湖交流プラザ きらら（山梨県）","YouTube Theater, Inglewood, CA, USA":"YouTubeシアター（アメリカ・イングルウッド）","Zepp DiverCity (TOKYO), Tokyo, Japan":"Zepp DiverCity（東京都）","Zepp Fukuoka, Fukuoka, Japan":"Zepp Fukuoka（福岡県）","Zepp Nagoya, Nagoya, Japan":"Zepp Nagoya（愛知県）","Zepp Namba (OSAKA), Osaka, Japan":"Zepp Namba（大阪府）","Zepp Sapporo, Sapporo, Japan":"Zepp Sapporo（北海道）","Zepp Tokyo, Tokyo, Japan":"Zepp Tokyo（東京都）","club GRINDHOUSE, Tokushima, Japan":"club GRINDHOUSE（徳島県）","cube garden, Sapporo, Japan":"cube garden（北海道札幌市）","darwin, Sendai, Japan":"仙台darwin（宮城県）"
};
const canonicalTitle=(r:Omit<SetlistRecord,"kind">)=>{
 if(eventNames[r.date])return eventNames[r.date];
 if(r.title==="JUNK")return /Japan$/.test(r.venue)?"米津玄師 2025 TOUR / JUNK":"KENSHI YONEZU 2025 WORLD TOUR / JUNK";
 if(r.title==="Fogbound")return r.year===2018?"米津玄師 2018 LIVE / Fogbound":"米津玄師 2017 TOUR / Fogbound";
 return tourNames[r.title]??r.title;
};
const records=(verified as Omit<SetlistRecord,"kind">[]).map((r):SetlistRecord=>{const title=canonicalTitle(r);return {...r,title,venue:venueNames[r.venue]??r.venue,songs:r.songs.map(song=>({...song,name:song.name==="Santa Maria"?"サンタマリア":song.name})),kind:/FESTIVAL|SONIC|baSH|LOVE SHOWER|SUNSET|サンセット|RADWIMPS|Weeknd/.test(title)?"festival":/NHK|FORTNITE|紅白/.test(title)?"event":"tour"}});
export const setlists:SetlistRecord[]=[...records,...early].sort((a,b)=>b.date.localeCompare(a.date));

const releases: {name:string; type:string; year:string; songs:string[]}[] = [
  {name:"花束と水葬",type:"ハチ作品",year:"2010",songs:["Persona Alice","WORLD'S END UMBRELLA","Mrs.Pumpkinの滑稽な夢","バウムクーヘン","clock lock works","Ghost Mansion","Qualia","恋人のランジェ","花束と水葬"]},
  {name:"OFFICIAL ORANGE",type:"ハチ作品",year:"2010",songs:["パンダヒーロー","演劇テレプシコーラ","リンネ","神様と林檎飴","結んで開いて羅刹と骸","沙上の夢喰い少女","病棟305号室","眩暈電話","マトリョシカ","白痴","ワンダーランドと羊の歌","遊園市街"]},
  {name:"diorama",type:"ALBUM",year:"2012",songs:["街","ゴーゴー幽霊船","駄菓子屋商売","caribou","あめふり婦人","ディスコバルーン","vivi","トイパトリオット","恋と病熱","Black Sheep","乾涸びたバスひとつ","首なし閑古鳥","心像放映","抄本"]},
  {name:"YANKEE",type:"ALBUM",year:"2014",songs:["リビングデッド・ユース","MAD HEAD LOVE","百鬼夜行","ホラ吹き猫野郎","海と山椒魚","メランコリーキッチン","アイネクライネ","しとど晴天大迷惑","TOXIC BOY","WOODEN DOLL","ドーナツホール","サンタマリア","眼福","花に嵐","KARMA CITY"]},
  {name:"Bremen",type:"ALBUM",year:"2015",songs:["アンビリーバーズ","フローライト","再上映","Flowerwall","あたしはゆうれい","ウィルオウィスプ","Undercover","Neon Sign","メトロノーム","雨の街路に夜光蟲","シンデレラグレイ","ミラージュソング","ホープランド","Blue Jasmine"]},
  {name:"BOOTLEG",type:"ALBUM",year:"2017",songs:["飛燕","LOSER","砂の惑星","orion","かいじゅうのマーチ","春雷","Moonlight","fogbound","愛麗絲","ピースサイン","Nighthawks","打上花火","灰色と青","ナンバーナイン"]},
  {name:"STRAY SHEEP",type:"ALBUM",year:"2020",songs:["カムパネルラ","Flamingo","感電","PLACEBO","パプリカ","馬と鹿","優しい人","Lemon","まちがいさがし","ひまわり","迷える羊","Décolleté","TEENAGE RIOT","海の幽霊","カナリヤ"]},
  {name:"LOST CORNER",type:"ALBUM",year:"2024",songs:["RED OUT","KICK BACK","マルゲリータ","POP SONG","死神","毎日","LADY","ゆめうつつ","さよーならまたいつか！","とまれみよ","LENS FLARE","月を見ていた","M八七","Pale Blue","がらくた","YELLOW GHOST","POST HUMAN","地球儀","LOST CORNER","おはよう"]},
  {name:"サンタマリア",type:"SINGLE",year:"2013",songs:["笛吹けども踊らず"]},
  {name:"MAD HEAD LOVE / ポッピンアパシー",type:"SINGLE",year:"2013",songs:["ポッピンアパシー","鳥にでもなりたい"]},
  {name:"Flowerwall",type:"SINGLE",year:"2015",songs:["懺悔の街","ペトリコール"]},
  {name:"アンビリーバーズ",type:"SINGLE",year:"2015",songs:["旅人電燈","こころにくだもの"]},
  {name:"LOSER / ナンバーナイン",type:"SINGLE",year:"2016",songs:["amen"]},
  {name:"orion",type:"SINGLE",year:"2017",songs:["翡翠の狼","ララバイさよなら"]},
  {name:"ピースサイン",type:"SINGLE",year:"2017",songs:["ゆめくいしょうじょ","Neighbourhood"]},
  {name:"Lemon",type:"SINGLE",year:"2018",songs:["Paper Flower","クランベリーとパンケーキ"]},
  {name:"Flamingo / TEENAGE RIOT",type:"SINGLE",year:"2018",songs:["ごめんね"]},
  {name:"馬と鹿",type:"SINGLE",year:"2019",songs:["でしょましょ"]},
  {name:"M八七",type:"SINGLE",year:"2022",songs:["ETA"]},
  {name:"KICK BACK",type:"SINGLE",year:"2022",songs:["恥ずかしくって"]},
  {name:"Plazma / BOW AND ARROW",type:"SINGLE",year:"2025",songs:["Plazma","BOW AND ARROW"]},
  {name:"IRIS OUT / JANE DOE",type:"SINGLE",year:"2025",songs:["IRIS OUT","JANE DOE"]},
  {name:"DIGITAL / OTHER",type:"SINGLE",year:"—",songs:["love","パーフェクトブルー","Azalea","KICK BACK (Remix)","1991","烏","夜鷹"]},
];

const counts = new Map<string,number>();
for (const record of setlists) for (const song of new Set(record.songs.map(s=>s.name))) {
  counts.set(song,(counts.get(song)??0)+1);
}
const assigned = new Set(releases.flatMap(r=>r.songs));
const otherSongs = [...counts.keys()].filter(song=>!assigned.has(song)).sort((a,b)=>a.localeCompare(b,"ja"));

export const releaseGroups = [...releases,{name:"未分類・ライブ限定",type:"OTHER",year:"—",songs:otherSongs}].map(release=>({
  ...release, songs: release.songs.map(song=>({name:song,confirmed:counts.get(song)??0})).sort((a,b)=>b.confirmed-a.confirmed || a.name.localeCompare(b.name,"ja")),
})).filter(group=>group.songs.length);

export const stats = { confirmedShows:setlists.length, performances:[...counts.values()].reduce((a,b)=>a+b,0), songs:counts.size };
export const showsForSong=(song:string)=>setlists.filter(show=>show.songs.some(item=>item.name===song));
