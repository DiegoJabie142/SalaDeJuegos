import{a as V,b as G}from"./chunk-TST2RFXB.js";import{C as B,E as L,d,f as P,g as R,h as f,j as D,u as N,v as O,w as j}from"./chunk-RA5UQWQ2.js";import"./chunk-WXI33M2S.js";import{H as q,R as A,S as M,g as F}from"./chunk-EAWJ4BSG.js";import{Eb as c,Lb as T,Mb as U,Nb as I,Va as i,Wa as E,e as z,g as v,ga as g,hb as p,jb as a,jc as k,ka as x,nb as _,ob as r,pb as l,qb as u,rb as S,sb as C,vb as y,wb as b}from"./chunk-HPN74DU2.js";var h=z(A());var H=()=>({name:"Qui\xE9n soy?",url:"/quien-soy"}),Q=e=>[e];function $(e,n){e&1&&(r(0,"div",13),c(1,"El nombre es requerido"),l())}function K(e,n){e&1&&(r(0,"div",13),c(1,"El nombre debe tener 5 o m\xE1s car\xE1cteres"),l())}function J(e,n){if(e&1&&(S(0,8),p(1,$,2,0,"div",12)(2,K,2,0,"div",12),C()),e&2){let o=b();i(),a("ngIf",o.form.controls.name.errors==null?null:o.form.controls.name.errors.required),i(),a("ngIf",!(o.form.controls.name.errors!=null&&o.form.controls.name.errors.required))}}function W(e,n){e&1&&(r(0,"div",13),c(1,"El correo es requerido"),l())}function X(e,n){e&1&&(r(0,"div",13),c(1,"Ingrese un formato correcto"),l())}function Y(e,n){if(e&1&&(S(0,8),p(1,W,2,0,"div",12)(2,X,2,0,"div",12),C()),e&2){let o=b();i(),a("ngIf",o.form.controls.email.errors==null?null:o.form.controls.email.errors.required),i(),a("ngIf",o.form.controls.email.errors==null?null:o.form.controls.email.errors.email)}}function Z(e,n){e&1&&(r(0,"div",13),c(1,"La contrase\xF1a es requerida"),l())}function ee(e,n){e&1&&(r(0,"div",13),c(1,"Debe tener 6 car\xE1cteres o m\xE1s"),l())}function te(e,n){if(e&1&&(S(0,8),p(1,Z,2,0,"div",12)(2,ee,2,0,"div",12),C()),e&2){let o=b();i(),a("ngIf",o.form.controls.password.errors==null?null:o.form.controls.password.errors.required),i(),a("ngIf",o.form.controls.password.errors==null?null:o.form.controls.password.errors.email)}}var ve=(()=>{let n=class n{constructor(s){this.router=s,this.fb=g(N),this.form=this.fb.group({uid:new f(""),email:new f("",[d.required,d.email]),name:new f("",[d.required,d.minLength(5)]),password:new f("",[d.required,d.minLength(6)])}),this.firebaseSvc=g(M),this.utilSvc=g(q)}submit(){return v(this,null,function*(){if(this.form.valid)try{let s=yield this.firebaseSvc.signUp(this.form.value);yield this.firebaseSvc.updateUser(this.form.value.name);let m=s.user.uid;this.form.controls.uid.setValue(m),this.setUserInfo(m),yield h.default.fire({icon:"success",title:"Cuenta creada exitosamente",text:`Bienvenido, ${s.user.email}`})}catch(s){yield h.default.fire({icon:"error",title:"Error al crear la cuenta",text:s.message||"Hubo un problema al intentar crear la cuenta. Por favor, intenta nuevamente m\xE1s tarde."})}finally{console.log("Proceso finalizado")}else yield h.default.fire({icon:"warning",title:"Formulario inv\xE1lido",text:"Por favor, revisa los campos e intenta nuevamente."})})}setUserInfo(s){return v(this,null,function*(){if(this.form.valid){let m=`users/${s}`;delete this.form.value.password,yield this.firebaseSvc.setDocument(m,this.form.value).then(t=>v(this,null,function*(){this.utilSvc.saveInLocalStorage("user",this.form.value),this.form.reset()})).catch(t=>{console.log(t)}).finally(()=>{})}})}};n.\u0275fac=function(m){return new(m||n)(E(F))},n.\u0275cmp=x({type:n,selectors:[["app-sign-up"]],standalone:!0,features:[T],decls:19,vars:13,consts:[["title","REGISTRARSE",3,"routes","back","whereToBack"],[1,"body"],[1,"bg-goku"],[1,"d-flex-center","widht-100"],[1,"d-flex-center","width-100"],[1,"auth-form",3,"ngSubmit","keypress.enter"],[1,"margin-input"],["label","Nombre","type","name",3,"control"],[1,"validators-container"],["label","Correo","type","email",3,"control"],["label","Contrase\xF1a","type","password",3,"keypress.enter","control"],["mat-flat-button","","color","warn",1,"button-login",3,"disabled"],["class","validators",4,"ngIf"],[1,"validators"]],template:function(m,t){m&1&&(u(0,"app-header",0),r(1,"div",1),u(2,"div",2),r(3,"div",3),u(4,"app-logo"),l(),r(5,"div",4)(6,"form",5),y("ngSubmit",function(){return t.submit()})("keypress.enter",function(){return t.submit()}),r(7,"div",6),u(8,"app-custom-input",7),l(),p(9,J,3,2,"ng-container",8),r(10,"div",6),u(11,"app-custom-input",9),l(),p(12,Y,3,2,"ng-container",8),r(13,"div",6)(14,"app-custom-input",10),y("keypress.enter",function(){return t.submit()}),l()(),p(15,te,3,2,"ng-container",8),r(16,"div",3)(17,"button",11),c(18,"REGISTRARSE"),l()()()()()),m&2&&(a("routes",I(11,Q,U(10,H)))("back",!0)("whereToBack","/auth"),i(8),a("control",t.form.controls.name),i(),_(9,t.form.controls.name.errors&&t.form.controls.name.touched?9:-1),i(2),a("control",t.form.controls.email),i(),_(12,t.form.controls.email.errors&&t.form.controls.email.touched?12:-1),i(2),a("control",t.form.controls.password),i(),_(15,t.form.controls.password.errors&&t.form.controls.password.touched?15:-1),i(2),a("disabled",t.form.invalid))},dependencies:[L,V,G,B,j,D,P,O,R,k],styles:['.d-flex[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;flex-wrap:wrap}.body[_ngcontent-%COMP%]{background-image:url("./media/background-game-PDKV3QDS.svg");background-repeat:no-repeat;background-position:center;object-fit:cover;height:800px;margin-top:20px}.d-flex-space-between[_ngcontent-%COMP%]{display:flex;align-content:space-between;justify-content:space-between}.margin-input[_ngcontent-%COMP%]{margin-top:40px}.button-login[_ngcontent-%COMP%]{padding:22px;margin-top:40px}.validators[_ngcontent-%COMP%]{font-size:15px;text-align:center;color:red}']});let e=n;return e})();export{ve as SignUpComponent};
