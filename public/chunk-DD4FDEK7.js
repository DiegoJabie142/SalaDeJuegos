import{a as j,b as G}from"./chunk-TST2RFXB.js";import{C as R,E as V,d,f as M,h as y,j as D,n as q,u as O,v as P,w as N}from"./chunk-RA5UQWQ2.js";import"./chunk-WXI33M2S.js";import{S as F,g as A}from"./chunk-EAWJ4BSG.js";import{Eb as s,Lb as E,Mb as I,Nb as k,Va as a,Wa as x,g as S,ga as _,hb as u,jb as l,jc as T,ka as w,nb as v,ob as t,pb as r,qb as c,rb as b,sb as C,vb as p,wb as h}from"./chunk-HPN74DU2.js";var B=()=>({name:"Qui\xE9n soy?",url:"/quien-soy"}),L=e=>[e];function Q(e,o){e&1&&(t(0,"div",16),s(1,"El correo es requerido"),r())}function z(e,o){e&1&&(t(0,"div",16),s(1,"Ingrese un correo v\xE1lido"),r())}function H(e,o){if(e&1&&(b(0,8),u(1,Q,2,0,"div",15)(2,z,2,0,"div",15),C()),e&2){let m=h();a(),l("ngIf",m.form.controls.email.errors==null?null:m.form.controls.email.errors.required),a(),l("ngIf",m.form.controls.email.errors==null?null:m.form.controls.email.errors.email)}}function K(e,o){e&1&&(t(0,"div",16),s(1,"La contrase\xF1a es requerida"),r())}function J(e,o){e&1&&(t(0,"div",16),s(1,"Debe tener 6 car\xE1cteres o m\xE1s"),r())}function W(e,o){if(e&1&&(b(0,8),u(1,K,2,0,"div",15)(2,J,2,0,"div",15),C()),e&2){let m=h();a(),l("ngIf",m.form.controls.password.errors==null?null:m.form.controls.password.errors.required),a(),l("ngIf",!(m.form.controls.password.errors!=null&&m.form.controls.password.errors.required))}}var me=(()=>{let o=class o{constructor(i){this.router=i,this.fb=_(O),this.form=this.fb.group({email:new y("",[d.required,d.email]),password:new y("",[d.required,d.minLength(6)])}),this.firebaseSvc=_(F)}ngOnInit(){}redirectToSignUp(i){i?.preventDefault(),this.router.navigateByUrl("/auth/sign-up")}submit(){return S(this,null,function*(){try{let i=yield this.firebaseSvc.sigIn(this.form.value);console.log("Sesi\xF3n iniciada correctamente:",i),this.router.navigateByUrl("/main/home")}catch(i){console.error("Error al iniciar sesi\xF3n:",i)}})}autoComplete(i){event?.preventDefault(),i==="admin"?(this.form.controls.email.setValue("diegojabie@gmail.com"),this.form.controls.password.setValue("123456")):i==="user"&&(this.form.controls.email.setValue("diegos4p3@gmail.com"),this.form.controls.password.setValue("123456"))}};o.\u0275fac=function(f){return new(f||o)(x(A))},o.\u0275cmp=w({type:o,selectors:[["app-auth"]],standalone:!0,features:[E],decls:23,vars:10,consts:[["title","Iniciar Sesi\xF3n",3,"routes"],[1,"body"],[1,"bg-goku"],[1,"d-flex-center","widht-100"],[1,"d-flex-center","width-100"],[1,"auth-form",3,"ngSubmit","keypress.enter","formGroup"],[1,"margin-input"],["label","Correo","type","email","name","email",3,"control"],[1,"validators-container"],["label","Contrase\xF1a","type","password",3,"control"],[1,"d-flex-space-between","widht-100"],["mat-flat-button","","color","primary","type","submit",1,"button-login",3,"disabled"],["mat-flat-button","","color","warn",1,"button-login",3,"click"],["mat-flat-button","","color","accent",1,"button-login",3,"click"],["mat-flat-button","","color","primary",1,"button-login",3,"click"],["class","validators",4,"ngIf"],[1,"validators"]],template:function(f,n){f&1&&(c(0,"app-header",0),t(1,"div",1),c(2,"div",2),t(3,"div",3),c(4,"app-logo"),r(),t(5,"div",4)(6,"form",5),p("ngSubmit",function(){return n.submit()})("keypress.enter",function(){return n.submit()}),t(7,"div",6),c(8,"app-custom-input",7),r(),u(9,H,3,2,"ng-container",8),t(10,"div",6),c(11,"app-custom-input",9),r(),u(12,W,3,2,"ng-container",8),t(13,"div",10)(14,"button",11),s(15,"INICIAR SESI\xD3N"),r(),t(16,"button",12),p("click",function(U){return n.redirectToSignUp(U)}),s(17,"REGISTRARSE"),r()(),t(18,"div",10)(19,"button",13),p("click",function(){return n.autoComplete("admin")}),s(20,"Iniciar ADMIN"),r(),t(21,"button",14),p("click",function(){return n.autoComplete("user")}),s(22,"Iniciar USER"),r()()()()()),f&2&&(l("routes",k(8,L,I(7,B))),a(6),l("formGroup",n.form),a(2),l("control",n.form.controls.email),a(),v(9,n.form.controls.email.errors&&n.form.controls.email.touched?9:-1),a(2),l("control",n.form.controls.password),a(),v(12,n.form.controls.password.errors&&n.form.controls.password.touched?12:-1),a(2),l("disabled",n.form.invalid))},dependencies:[V,j,G,R,P,D,M,N,q,T],styles:['.d-flex[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;flex-wrap:wrap}.body[_ngcontent-%COMP%]{background-image:url("./media/background-game-PDKV3QDS.svg");background-repeat:no-repeat;background-position:center;object-fit:cover;height:800px;margin-top:20px}.d-flex-space-between[_ngcontent-%COMP%]{display:flex;align-content:space-between;justify-content:space-between}.margin-input[_ngcontent-%COMP%]{margin-top:40px}.button-login[_ngcontent-%COMP%]{padding:22px;margin-top:40px}.validators-container[_ngcontent-%COMP%]{margin-top:0}.validators[_ngcontent-%COMP%]{font-size:15px;text-align:center;color:red}']});let e=o;return e})();export{me as AuthComponent};