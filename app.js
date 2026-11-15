const demoNews = [
 {id:1,type:"official",league:"SÜPER LİG",player:"Örnek Oyuncu A",club:"Örnek Kulüp",title:"Resmî açıklama örneği: transfer tamamlandı",summary:"Bu kart, kulübün resmî duyurusunun sitede nasıl görüneceğini göstermek için hazırlanmış örnek içeriktir.",source:"WLUARIUS SPORTS DEMO",time:"Örnek içerik",category:"superlig"},
 {id:2,type:"rumour",league:"PREMIER LEAGUE",player:"Örnek Oyuncu B",club:"Örnek Kulüp",title:"Avrupa kulübünün oyuncuyla ilgilendiği öne sürüldü",summary:"Kaynak ve haber metni doğrulanmadan bu iddia gerçek haber olarak yayımlanmamalıdır.",source:"ÖRNEK KAYNAK",time:"Örnek içerik",category:"europe"},
 {id:3,type:"rumour",league:"LA LIGA",player:"Örnek Oyuncu C",club:"Örnek Kulüp",title:"Transfer görüşmesi iddiası gündeme geldi",summary:"Bu örnek kartta iddia etiketi, kaynak ve haber özeti birlikte gösterilir.",source:"ÖRNEK KAYNAK",time:"Örnek içerik",category:"europe"},
 {id:4,type:"official",league:"BUNDESLIGA",player:"Örnek Oyuncu D",club:"Örnek Kulüp",title:"Kulüpten transfer duyurusu için örnek kart",summary:"Gerçek sürümde resmî kulüp açıklaması veya doğrulanabilir birincil kaynak bağlantısı kullanılacaktır.",source:"KULÜP AÇIKLAMASI ÖRNEĞİ",time:"Örnek içerik",category:"europe"},
 {id:5,type:"rumour",league:"SÜPER LİG",player:"Örnek Oyuncu E",club:"Örnek Kulüp",title:"Süper Lig ekibi için transfer söylentisi örneği",summary:"Yayımlanmadan önce oyuncu, mevcut kulüp, ilgilenen kulüp ve haberin bağlamı kontrol edilmelidir.",source:"ÖRNEK KAYNAK",time:"Örnek içerik",category:"superlig"},
 {id:6,type:"rumour",league:"SERIE A",player:"Örnek Oyuncu F",club:"Örnek Kulüp",title:"İtalya'da transfer piyasasından örnek gelişme",summary:"Bu alan gerçek RSS ve haber doğrulama altyapısı bağlandığında otomatik doldurulacaktır.",source:"ÖRNEK KAYNAK",time:"Örnek içerik",category:"europe"}
];
const players = [
 {name:"Örnek Oyuncu A",position:"Forvet",club:"Örnek Kulüp",number:"09",detail:"Oyuncu profilinde mevki, mevcut takım, sezon istatistikleri ve doğrulanmış transfer geçmişi gösterilecek."},
 {name:"Örnek Oyuncu B",position:"Orta saha",club:"Örnek Kulüp",number:"08",detail:"Profil verileri gerçek veri kaynağı bağlandığında güncellenecek."},
 {name:"Örnek Oyuncu C",position:"Kanat",club:"Örnek Kulüp",number:"11",detail:"Transfer haberleri oyuncunun profilinde bir araya getirilecek."},
 {name:"Örnek Oyuncu D",position:"Defans",club:"Örnek Kulüp",number:"04",detail:"Kulüp geçmişi ve transfer geçmişi doğrulanmış kayıtlarla gösterilecek."}
];
const clubs = [
 {name:"Beşiktaş",short:"BJK",league:"Süper Lig",news: "Kulüp haberleri ve transfer gündemi"},
 {name:"Fenerbahçe",short:"FB",league:"Süper Lig",news:"Kulüp haberleri ve transfer gündemi"},
 {name:"Galatasaray",short:"GS",league:"Süper Lig",news:"Kulüp haberleri ve transfer gündemi"},
 {name:"Trabzonspor",short:"TS",league:"Süper Lig",news:"Kulüp haberleri ve transfer gündemi"},
 {name:"Real Madrid",short:"RM",league:"La Liga",news:"Kulüp haberleri ve transfer gündemi"},
 {name:"Arsenal",short:"AFC",league:"Premier League",news:"Kulüp haberleri ve transfer gündemi"},
 {name:"Bayern Münih",short:"FCB",league:"Bundesliga",news:"Kulüp haberleri ve transfer gündemi"},
 {name:"Liverpool",short:"LFC",league:"Premier League",news:"Kulüp haberleri ve transfer gündemi"}
];
let activeFilter="all";
const $=s=>document.querySelector(s);
const typeLabel=t=>t==="official"?"RESMÎ":"SÖYLENTİ";
function renderNews(){
 const q=$("#searchInput").value.trim().toLocaleLowerCase("tr");
 const list=demoNews.filter(n=>{
  const matchFilter=activeFilter==="all"||(activeFilter==="official"&&n.type==="official")||(activeFilter==="rumour"&&n.type==="rumour")||n.category===activeFilter;
  const hay=[n.player,n.club,n.title,n.summary,n.league].join(" ").toLocaleLowerCase("tr");
  return matchFilter&&hay.includes(q);
 });
 $("#newsGrid").innerHTML=list.map(n=>`<article class="news-card" data-id="${n.id}" tabindex="0"><div class="card-top ${n.type}"></div><div class="card-body"><div class="card-meta"><span class="tag ${n.type}">${typeLabel(n.type)}</span><span class="league">${n.league}</span></div><h3>${n.title}</h3><p>${n.summary}</p><div class="card-footer"><b>${n.player}</b><span>${n.time} ↗</span></div></div></article>`).join("");
 $("#emptyState").classList.toggle("hidden",list.length>0);
 document.querySelectorAll(".news-card").forEach(card=>{card.addEventListener("click",()=>openNews(Number(card.dataset.id)));card.addEventListener("keydown",e=>{if(e.key==="Enter")openNews(Number(card.dataset.id))})});
 $("#rumourPanel").innerHTML=demoNews.filter(n=>n.type==="rumour").slice(0,4).map(n=>`<div class="rumour-item"><div class="rumour-icon">↗</div><div><h3>${n.player} · ${n.club}</h3><p>${n.title}</p></div><span class="rumour-state">İDDİA</span></div>`).join("");
}
function renderPlayers(){
 $("#playerGrid").innerHTML=players.map(p=>`<article class="player-card" data-player="${p.name}"><div class="player-avatar">${p.number}</div><h3>${p.name}</h3><p>${p.position}</p><div class="player-club"><span>${p.club}</span><span>PROFİL ↗</span></div></article>`).join("");
 document.querySelectorAll(".player-card").forEach(card=>card.addEventListener("click",()=>{const p=players.find(x=>x.name===card.dataset.player);showModal(`<div class="eyebrow">OYUNCU PROFİLİ · DEMO</div><h2>${p.name}</h2><p><b>Mevki:</b> ${p.position}<br><b>Mevcut kulüp:</b> ${p.club}</p><p>${p.detail}</p>`)}));
}
function renderClubs(){
 $("#clubGrid").innerHTML=clubs.map(c=>`<article class="club-card" data-club="${c.name}"><div class="club-crest">${c.short}</div><div><h3>${c.name}</h3><p>${c.league}</p></div></article>`).join("");
 document.querySelectorAll(".club-card").forEach(card=>card.addEventListener("click",()=>{const c=clubs.find(x=>x.name===card.dataset.club);showModal(`<div class="eyebrow">KULÜP MERKEZİ · DEMO</div><h2>${c.name}</h2><p>${c.league}</p><p>${c.news}. Gerçek sürümde kulübün transfer haberleri, gelen/giden oyuncuları ve resmî açıklamaları burada listelenecek.</p>`)}));
}
function showModal(html){$("#modalContent").innerHTML=html;$("#detailModal").classList.remove("hidden")}
function openNews(id){const n=demoNews.find(x=>x.id===id);if(!n)return;showModal(`<div class="eyebrow">${typeLabel(n.type)} · ${n.league} · DEMO</div><h2>${n.title}</h2><p>${n.summary}</p><p><b>Oyuncu:</b> ${n.player}<br><b>Kulüp:</b> ${n.club}<br><b>Kaynak:</b> ${n.source}</p><p>Bu örnek içerik gerçek bir transfer iddiası değildir. Canlı sürümde haberin orijinal kaynak bağlantısı burada yer alacak.</p>`)}
$("#feedFilters").addEventListener("click",e=>{const b=e.target.closest("button[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderNews()});
$("#searchInput").addEventListener("input",renderNews);
$("#refreshButton").addEventListener("click",()=>{const b=$("#refreshButton");b.textContent="✓";setTimeout(()=>b.textContent="↻",900);renderNews()});
$("#menuToggle").addEventListener("click",()=>$(".main-nav").classList.toggle("open"));
$("#detailModal").addEventListener("click",e=>{if(e.target.matches("[data-close]"))$("#detailModal").classList.add("hidden")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#detailModal").classList.add("hidden")});
renderNews();renderPlayers();renderClubs();
