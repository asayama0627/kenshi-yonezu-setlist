"use client";

import { useMemo, useState } from "react";
import { releaseGroups, setlists, showsForSong, stats, type SetlistRecord } from "./data/archive";

type View = "live" | "songs";

type LiveGroup = { title:string; kind:SetlistRecord["kind"]; shows:SetlistRecord[] };

function TourArchive({group,onOpen}:{group:LiveGroup;onOpen:(show:SetlistRecord)=>void}){
  const [selected,setSelected]=useState(group.shows[0]?.id??"");
  const show=group.shows.find(item=>item.id===selected)??group.shows[0];
  const common=group.shows.length>1?group.shows[0].songs.filter((song,index,all)=>all.findIndex(item=>item.name===song.name)===index&&group.shows.every(item=>item.songs.some(entry=>entry.name===song.name))):group.shows[0].songs;
  const commonNames=new Set(common.map(song=>song.name));
  const variations=group.shows.map(item=>({show:item,songs:item.songs.map((song,index)=>({name:song.name,position:index+1})).filter(song=>!commonNames.has(song.name))}));
  return <details className="tour-group">
    <summary><div><small>{group.kind.toUpperCase()} · {group.shows[0].date.slice(0,4)}</small><h3>{group.title}</h3></div><span><b>{group.shows.length}</b> 公演収録</span></summary>
    <div className="tour-body">
      <div className="show-picker"><label>公演を選択<select value={show.id} onChange={e=>setSelected(e.target.value)}>{group.shows.map(item=><option value={item.id} key={item.id}>{item.date.replaceAll("-",".")}　{item.venue}</option>)}</select></label><button onClick={()=>onOpen(show)}>この公演の全曲順を見る →</button></div>
      <div className="tour-tables">
        <section><header><div><span>STANDARD SETLIST</span><h4>{group.shows.length>1?"全公演共通の基本セット":"セットリスト"}</h4></div><b>{common.length}曲</b></header><div className="base-setlist">{common.map((song,index)=><div key={song.name}><span>{String(index+1).padStart(2,"0")}</span><strong>{song.name}</strong></div>)}</div></section>
        {group.shows.length>1&&<section><header><div><span>DAILY VARIATIONS</span><h4>日替わり・公演別曲</h4></div></header><div className="variation-table"><div className="variation-head"><span>公演日・会場</span><span>基本セット以外の演奏曲（実際の曲順）</span></div>{variations.map(item=><div className="variation-row" key={item.show.id}><span><b>{item.show.date.replaceAll("-",".")}</b><small>{item.show.venue}</small></span><span>{item.songs.length?item.songs.map(song=><em key={`${song.position}-${song.name}`}><i>{song.position}</i>{song.name}</em>):<small>日替わり曲なし</small>}</span></div>)}</div></section>}
      </div>
      <p className="table-note">基本セットは、この項目に収録した全公演で演奏が確認できる楽曲です。番号付きの完全な曲順は公演ごとに確認できます。</p>
    </div>
  </details>
}

export default function Home(){
  const [view,setView]=useState<View>("live"); const [query,setQuery]=useState(""); const [year,setYear]=useState("all"); const [kind,setKind]=useState("all"); const [open,setOpen]=useState<SetlistRecord|null>(null); const [songOpen,setSongOpen]=useState<string|null>(null); const [release,setRelease]=useState("all");
  const years=[...new Set(setlists.map(s=>s.year))].sort((a,b)=>a-b);
  const lives=useMemo(()=>setlists.filter(s=>`${s.title} ${s.venue} ${s.songs.map(x=>x.name).join(" ")}`.toLowerCase().includes(query.toLowerCase())&&(year==="all"||s.year===+year)&&(kind==="all"||s.kind===kind)),[query,year,kind]);
  const liveGroups=useMemo(()=>{const map=new Map<string,LiveGroup>();for(const show of lives){const current=map.get(show.title);if(current)current.shows.push(show);else map.set(show.title,{title:show.title,kind:show.kind,shows:[show]})}return [...map.values()]},[lives]);
  const groups=useMemo(()=>releaseGroups.filter(g=>(release==="all"||g.name===release)&&(!query||`${g.name} ${g.songs.map(s=>s.name).join(" ")}`.toLowerCase().includes(query.toLowerCase()))),[query,release]);
  const switchView=(next:View)=>{setView(next);setQuery("");window.setTimeout(()=>document.querySelector("#database")?.scrollIntoView({behavior:"smooth"}),30)};
  return <main>
    <header className="site-header"><a className="brand" href="#top"><span>米津玄師</span><b>SETLIST ARCHIVE</b></a><nav><a href="#top">ホーム</a><button onClick={()=>switchView("live")}>ライブ一覧</button><button onClick={()=>switchView("songs")}>楽曲一覧</button><a href="#method">集計方法</a></nav></header>
    <section id="top" className="hero compact-hero"><div className="hero-art"/><div className="hero-copy"><p className="eyebrow">VERIFIED LIVE PERFORMANCE DATABASE · 2011—2025</p><h1>米津玄師<span>SETLIST ARCHIVE</span></h1><div className="archive-stats"><div><strong>{stats.confirmedShows}</strong><span>セットリスト確認公演</span></div><div><strong>{stats.songs}</strong><span>演奏確認楽曲</span></div></div></div></section>
    <div className="view-tabs" id="database"><button className={view==="live"?"selected":""} onClick={()=>switchView("live")}><span>01</span>ライブ・セットリスト</button><button className={view==="songs"?"selected":""} onClick={()=>switchView("songs")}><span>02</span>楽曲別演奏回数</button></div>
    <section className="database-section">
      <div className="db-head"><div><p>{view==="live"?"LIVE ARCHIVE":"SONG INDEX"}</p><h2>{view==="live"?"ライブ一覧":"作品別・楽曲一覧"}</h2></div><label className="db-search">⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder={view==="live"?"ライブ名・会場・楽曲で検索":"作品名・楽曲名で検索"}/></label></div>
      {view==="live"?<>
        <div className="db-filters"><label>年代<select value={year} onChange={e=>setYear(e.target.value)}><option value="all">すべて</option>{years.map(y=><option key={y}>{y}</option>)}</select></label><label>種別<select value={kind} onChange={e=>setKind(e.target.value)}><option value="all">すべて</option><option value="tour">ツアー／ワンマン</option><option value="festival">フェス／対バン</option><option value="event">配信／イベント</option></select></label><span>{lives.length} VERIFIED SETLISTS</span></div>
        <div className="tour-groups">{liveGroups.map(group=><TourArchive group={group} onOpen={setOpen} key={group.title}/>)}</div>
      </>:<>
        <div className="release-nav"><button className={release==="all"?"active":""} onClick={()=>setRelease("all")}>すべて</button>{releaseGroups.map(g=><button className={release===g.name?"active":""} key={g.name} onClick={()=>setRelease(g.name)}>{g.name}</button>)}</div>
        <p className="count-note">個別の公演ページで曲順まで公開確認できたセットリストのみを1回として集計しています。ツアー日数の掛け算や推測による補完はしていません。</p>
        <div className="release-list">{groups.map(g=><section className="release-card" key={g.name}><header><div><span>{g.type}</span><h3>{g.name}</h3></div><b>{g.year}</b></header><div className="song-table"><div className="song-head"><span>楽曲</span><span>確認済み演奏回数</span></div>{g.songs.map((s,i)=><div className="song-row" key={s.name}><span><i>{String(i+1).padStart(2,"0")}</i>{s.name}</span><button className="performance-link" onClick={()=>setSongOpen(s.name)} aria-label={`${s.name}が演奏されたライブを見る`}><strong>{s.confirmed}<small>回</small></strong><em>公演を見る →</em></button></div>)}</div></section>)}</div>
      </>}
    </section>
    <section id="method" className="method"><p>ABOUT THE DATA</p><h2>集計方法と注意点</h2><div><article><b>01</b><h3>個別公演単位</h3><p>2011〜2025年の公演を日付・会場ごとに分離。曲順まで公開されている公演だけを収録し、同じツアーでも日替わり曲を別々に記録します。</p></article><article><b>02</b><h3>確認済み演奏回数</h3><p>個別公演の番号付きセットリストに曲名がある場合のみ1回加算。未掲載公演をツアー共通セットリストで埋める推定処理は行いません。</p></article><article><b>03</b><h3>作品区分</h3><p>アルバム収録曲はアルバムへ、アルバム未収録曲・カップリングはシングルへ分類。ハチ名義とライブ限定曲は別枠です。</p></article></div></section>
    <footer className="site-footer"><div className="brand"><span>米津玄師</span><b>SETLIST ARCHIVE</b></div><p>非公式ファンアーカイブ。誤りや新しい情報は、出典を確認しながら随時更新します。</p><small>UNOFFICIAL FAN ARCHIVE · 2026</small></footer>
    {open&&<div className="modal-backdrop" onMouseDown={()=>setOpen(null)}><section className="modal ordered-modal" onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true"><button className="modal-close" onClick={()=>setOpen(null)}>×</button><p className="modal-kicker">{open.date} · {open.kind.toUpperCase()}</p><h2>{open.title}</h2><p className="modal-venue">{open.venue}</p><div className="setlist-order">{open.songs.map((song,i)=><div className={song.encore?"encore-song":""} key={`${song.name}-${i}`}>{song.encore&&(i===0||!open.songs[i-1].encore)&&<p>ENCORE</p>}<span>{String(i+1).padStart(2,"0")}</span><strong>{song.name}</strong></div>)}</div></section></div>}
    {songOpen&&<div className="modal-backdrop" onMouseDown={()=>setSongOpen(null)}><section className="modal song-history-modal" onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true"><button className="modal-close" onClick={()=>setSongOpen(null)}>×</button><p className="modal-kicker">PERFORMANCE HISTORY</p><h2>{songOpen}</h2><p className="modal-venue">確認済み {showsForSong(songOpen).length}公演</p><div className="performance-history">{showsForSong(songOpen).map(show=><article key={show.id}><time>{show.date}</time><div><h3>{show.title}</h3><p>{show.venue}</p></div><button onClick={()=>{setSongOpen(null);setOpen(show)}}>曲順を見る →</button></article>)}</div></section></div>}
  </main>
}
