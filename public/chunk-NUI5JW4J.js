import{E as D}from"./chunk-RA5UQWQ2.js";import"./chunk-WXI33M2S.js";import{S as V,a as z}from"./chunk-EAWJ4BSG.js";import{Ca as w,Db as E,Eb as p,Fb as P,Gb as b,Lb as x,Mb as I,Nb as S,Sb as T,Ta as k,Va as l,Wa as u,aa as F,fa as M,g as O,hb as d,hc as G,ic as B,jb as c,jc as A,ka as f,nc as j,ob as r,pb as a,qb as h,ta as v,tb as C,ua as _,vb as g,wb as m}from"./chunk-HPN74DU2.js";var U=(()=>{let n=class n{constructor(e){this.http=e,this.apiUrl="https://restcountries.com/v3.1/all"}getCountries(){return this.http.get(this.apiUrl)}};n.\u0275fac=function(i){return new(i||n)(M(z))},n.\u0275prov=F({token:n,factory:n.\u0275fac,providedIn:"root"});let t=n;return t})();var J=()=>[],L=t=>({lost:t});function R(t,n){if(t&1&&(r(0,"span",7),p(1," \u2764\uFE0F "),a()),t&2){let o=n.$implicit,e=m(2);c("ngClass",S(1,L,o>e.lives-1))}}function q(t,n){if(t&1&&(r(0,"div",8),h(1,"img",9),a()),t&2){let o=m(2);l(),c("src",o.currentCountry.flags.png,k)}}function K(t,n){if(t&1){let o=C();r(0,"div",10),g("click",function(){let i=v(o).$implicit,s=m(2);return _(s.checkAnswer(i))}),r(1,"p"),p(2),a()()}if(t&2){let o=n.$implicit;l(2),P(o.name.common)}}function W(t,n){if(t&1&&(r(0,"div",2)(1,"h2"),p(2,"\xA1Adivina la Bandera!"),a(),r(3,"p"),p(4),a(),r(5,"p"),p(6,"Vidas: "),d(7,R,2,3,"span",3),a(),d(8,q,2,1,"div",4),r(9,"div",5),d(10,K,3,1,"div",6),a()()),t&2){let o=m();l(4),b("Puntaje: ",o.score,""),l(3),c("ngForOf",I(4,J).constructor(o.lives)),l(),c("ngIf",o.currentCountry==null?null:o.currentCountry.flags),l(2),c("ngForOf",o.options)}}function X(t,n){if(t&1){let o=C();r(0,"div",11)(1,"p",12),p(2),a(),r(3,"button",13),g("click",function(){v(o);let i=m();return _(i.resetGame())}),p(4,"Reiniciar Juego"),a()()}if(t&2){let o=m();l(2),b("\xA1Juego Terminado! Puntaje final: ",o.score,"")}}var N=(()=>{let n=class n{constructor(e){this.flagService=e,this.gameFinished=new w,this.countries=[],this.options=[],this.score=0,this.lives=3,this.gameOver=!1}ngOnInit(){this.flagService.getCountries().subscribe(e=>{this.countries=e,this.nextQuestion()})}nextQuestion(){if(this.countries.length===0)return;let e=Math.floor(Math.random()*this.countries.length);if(this.currentCountry=this.countries[e],!this.currentCountry.flags){console.error("Error: El pa\xEDs seleccionado no tiene bandera:",this.currentCountry);return}for(this.options=[this.currentCountry],console.log(this.currentCountry.name.common);this.options.length<4;){let i=Math.floor(Math.random()*this.countries.length),s=this.countries[i];this.options.includes(s)||this.options.push(s)}this.options=this.shuffleArray(this.options)}shuffleArray(e){for(let i=e.length-1;i>0;i--){let s=Math.floor(Math.random()*(i+1));[e[i],e[s]]=[e[s],e[i]]}return e}checkAnswer(e){this.gameOver||(e===this.currentCountry?this.score+=10:this.lives--,this.nextQuestion(),this.lives===0&&(this.gameOver=!0,this.gameFinished.emit({score:this.score,date:new Date})))}resetGame(){this.score=0,this.lives=3,this.gameOver=!1,this.nextQuestion()}};n.\u0275fac=function(i){return new(i||n)(u(U))},n.\u0275cmp=f({type:n,selectors:[["app-game-board"]],outputs:{gameFinished:"gameFinished"},standalone:!0,features:[x],decls:3,vars:2,consts:[["gameOverTemplate",""],["class","game-board",4,"ngIf","ngIfElse"],[1,"game-board"],["class","life",3,"ngClass",4,"ngFor","ngForOf"],["class","flag-container",4,"ngIf"],[1,"options"],["class","option",3,"click",4,"ngFor","ngForOf"],[1,"life",3,"ngClass"],[1,"flag-container"],["alt","Flag",3,"src"],[1,"option",3,"click"],[1,"game-over-template"],[1,"game-over-message"],[3,"click"]],template:function(i,s){if(i&1&&d(0,W,11,5,"div",1)(1,X,5,1,"ng-template",null,0,T),i&2){let y=E(2);c("ngIf",!s.gameOver)("ngIfElse",y)}},dependencies:[A,B,j,G],styles:['@charset "UTF-8";.game-board[_ngcontent-%COMP%]{text-align:center;padding:20px;background-color:#f0f8ff;border-radius:10px;box-shadow:0 4px 8px #0000001a;max-width:600px;margin:0 auto;font-family:Arial,sans-serif}h2[_ngcontent-%COMP%]{font-size:36px;color:#333;margin-bottom:20px;font-weight:600}p[_ngcontent-%COMP%]{font-size:18px;color:#333}.flag-container[_ngcontent-%COMP%]{margin:20px 0;max-width:100%;display:flex;justify-content:center}.flag-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:200px;border-radius:8px;box-shadow:0 4px 8px #0003}.options[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin-top:20px}.option[_ngcontent-%COMP%]{background-color:#4caf50;color:#fff;padding:15px 30px;margin:10px 0;border-radius:8px;font-size:20px;cursor:pointer;transition:background-color .3s ease;width:80%;max-width:400px}.option[_ngcontent-%COMP%]:hover{background-color:#45a049}.life[_ngcontent-%COMP%]{font-size:28px;margin-right:5px;transition:color .3s ease}.life.lost[_ngcontent-%COMP%]{color:#ddd}.game-over-message[_ngcontent-%COMP%]{font-size:24px;font-weight:700;color:#e74c3c;margin-bottom:30px}.game-over-template[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:#000000b3;color:#fff;padding:40px;border-radius:10px;text-align:center;box-shadow:0 4px 8px #0000004d;z-index:9999}.game-over-message[_ngcontent-%COMP%]{font-size:24px;font-weight:700;margin-bottom:20px}button[_ngcontent-%COMP%]{padding:12px 24px;font-size:18px;background-color:#3498db;color:#fff;border:none;border-radius:8px;cursor:pointer;transition:background-color .3s ease}button[_ngcontent-%COMP%]:hover{background-color:#2980b9}']});let t=n;return t})();var ce=(()=>{let n=class n{constructor(e){this.firebaseSvc=e}onGameFinished(e){return O(this,null,function*(){try{yield this.firebaseSvc.saveGameAdivinaLaBandera(e.score,e.date)}catch(i){console.error("Error al guardar la partida:",i)}})}};n.\u0275fac=function(i){return new(i||n)(u(V))},n.\u0275cmp=f({type:n,selectors:[["app-adivina-la-bandera-game"]],standalone:!0,features:[x],decls:3,vars:2,consts:[["title","Adivina la bandera",3,"back","whereToBack"],[1,"bg"],[3,"gameFinished"]],template:function(i,s){i&1&&(h(0,"app-header",0),r(1,"div",1)(2,"app-game-board",2),g("gameFinished",function($){return s.onGameFinished($)}),a()()),i&2&&c("back",!0)("whereToBack","main/home")},dependencies:[N,D],styles:[".bg[_ngcontent-%COMP%]{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);padding-top:80px;height:84.5vh}"]});let t=n;return t})();export{ce as AdivinaLaBanderaGameComponent};