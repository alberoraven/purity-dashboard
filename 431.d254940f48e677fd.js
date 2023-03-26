"use strict";(self.webpackChunkpurity_smart_services=self.webpackChunkpurity_smart_services||[]).push([[431],{8431:(b,g,i)=>{i.r(g),i.d(g,{AuthLayoutModule:()=>f});var p=i(9299),u=i(6895),r=i(4006),m=i(5908),v=i(5861),l=i(5756),e=i(4650);const y=[{path:"login",component:(()=>{class o{constructor(t,n){this.router=t,this.elRef=n,this.login={username:"",password:""},this.submitted=!1}ngOnInit(){console.log(l.q.auth.getUser()),l.q.auth.getUser()&&l.q.auth.getUser().roles.includes("admin")&&(this.storeValuetoStorage(l.q.auth.getUser()),this.router.navigateByUrl("/admin/dashboard"))}onLogin(t){var n=this;return(0,v.Z)(function*(){n.submitted=!0,t.valid&&(yield l.q.auth.signIn({email:t.value.username,password:t.value.password}).then(s=>{if(console.log(s),s.error)n.elRef.nativeElement.querySelector(".error").innerHTML=s.error.message+"!";else{if(!s.session.user.roles.includes("admin"))return n.elRef.nativeElement.querySelector(".error").innerHTML="UnAuthorised User",l.q.auth.signOut().then(()=>{sessionStorage.setItem("isLogin","false")});n.storeValuetoStorage(s.session.user),n.router.navigateByUrl("/admin/dashboard")}}))})()}storeValuetoStorage(t){sessionStorage.setItem("isLogin","true"),sessionStorage.setItem("name",t.displayName),sessionStorage.setItem("avatar",t.avatarUrl)}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(p.F0),e.Y36(e.SBq))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-login"]],decls:35,vars:3,consts:[[1,"header","bg-gradient-danger","py-7","py-lg-8"],[1,"container"],[1,"header-body","text-center","mb-7"],[1,"row","justify-content-center"],[1,"col-lg-5","col-md-6"],[1,"text-white"],[1,"separator","separator-bottom","separator-skew","zindex-100"],["x","0","y","0","viewBox","0 0 2560 100","preserveAspectRatio","none","version","1.1","xmlns","http://www.w3.org/2000/svg"],["points","2560 0 2560 100 0 100",1,"fill-default"],[1,"container","mt--8","pb-5"],[1,"col-lg-5","col-md-7"],[1,"card","bg-secondary","shadow","border-0"],[1,"card-body","px-lg-5","py-lg-5"],[1,"error"],["role","form","novalidate",""],["loginForm","ngForm"],[1,"form-group","mb-3"],[1,"input-group","input-group-alternative"],[1,"input-group-prepend"],[1,"input-group-text"],[1,"ni","ni-email-83"],["placeholder","Email","type","email","name","username","placeholder","Enter Email","required","",1,"form-control",3,"ngModel","ngModelChange"],["username","ngModel"],[1,"form-group"],[1,"ni","ni-lock-circle-open"],["placeholder","Password","type","password","name","password","placeholder","Enter Password","required","",1,"form-control",3,"ngModel","ngModelChange"],["password","ngModel"],[1,"text-center"],["type","button",1,"btn","btn-primary","my-4",3,"disabled","click"]],template:function(t,n){if(1&t){const s=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1",5),e._uU(6,"Welcome!"),e.qZA()()()()(),e.TgZ(7,"div",6),e.O4$(),e.TgZ(8,"svg",7),e._UZ(9,"polygon",8),e.qZA()()(),e.kcU(),e.TgZ(10,"div",9)(11,"div",3)(12,"div",10)(13,"div",11)(14,"div",12),e._UZ(15,"div",13),e.TgZ(16,"form",14,15)(18,"div",16)(19,"div",17)(20,"div",18)(21,"span",19),e._UZ(22,"i",20),e.qZA()(),e.TgZ(23,"input",21,22),e.NdJ("ngModelChange",function(d){return n.login.username=d}),e.qZA()()(),e.TgZ(25,"div",23)(26,"div",17)(27,"div",18)(28,"span",19),e._UZ(29,"i",24),e.qZA()(),e.TgZ(30,"input",25,26),e.NdJ("ngModelChange",function(d){return n.login.password=d}),e.qZA()()(),e.TgZ(32,"div",27)(33,"button",28),e.NdJ("click",function(){e.CHM(s);const d=e.MAs(17);return e.KtG(n.onLogin(d))}),e._uU(34,"Sign in"),e.qZA()()()()()()()()}if(2&t){const s=e.MAs(17);e.xp6(23),e.Q6J("ngModel",n.login.username),e.xp6(7),e.Q6J("ngModel",n.login.password),e.xp6(3),e.Q6J("disabled",!s.valid)}},dependencies:[r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.On,r.F],styles:[".error[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-bottom: 11px;\n  color: red;\n}"]}),o})()},{path:"privacy-policy",component:m.g},{path:"register",component:(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-register"]],decls:71,vars:0,consts:[[1,"header","bg-gradient-danger","py-7","py-lg-8"],[1,"container"],[1,"header-body","text-center","mb-7"],[1,"row","justify-content-center"],[1,"col-lg-5","col-md-6"],[1,"text-white"],[1,"text-lead","text-light"],[1,"separator","separator-bottom","separator-skew","zindex-100"],["x","0","y","0","viewBox","0 0 2560 100","preserveAspectRatio","none","version","1.1","xmlns","http://www.w3.org/2000/svg"],["points","2560 0 2560 100 0 100",1,"fill-default"],[1,"container","mt--8","pb-5"],[1,"col-lg-6","col-md-8"],[1,"card","bg-secondary","shadow","border-0"],[1,"card-header","bg-transparent","pb-5"],[1,"text-muted","text-center","mt-2","mb-4"],[1,"text-center"],["href","javascript:void(0)",1,"btn","btn-neutral","btn-icon","mr-4"],[1,"btn-inner--icon"],["src","assets/img/icons/common/github.svg"],[1,"btn-inner--text"],["href","javascript:void(0)",1,"btn","btn-neutral","btn-icon"],["src","assets/img/icons/common/google.svg"],[1,"card-body","px-lg-5","py-lg-5"],[1,"text-center","text-muted","mb-4"],["role","form"],[1,"form-group"],[1,"input-group","input-group-alternative","mb-3"],[1,"input-group-prepend"],[1,"input-group-text"],[1,"ni","ni-hat-3"],["placeholder","Name","type","text",1,"form-control"],[1,"ni","ni-email-83"],["placeholder","Email","type","email",1,"form-control"],[1,"input-group","input-group-alternative"],[1,"ni","ni-lock-circle-open"],["placeholder","Password","type","password",1,"form-control"],[1,"text-muted","font-italic"],[1,"text-success","font-weight-700"],[1,"row","my-4"],[1,"col-12"],[1,"custom-control","custom-control-alternative","custom-checkbox"],["id","customCheckRegister","type","checkbox",1,"custom-control-input"],["for","customCheckRegister",1,"custom-control-label"],[1,"text-muted"],["href","#!"],["type","button",1,"btn","btn-primary","mt-4"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1",5),e._uU(6,"Welcome!"),e.qZA(),e.TgZ(7,"p",6),e._uU(8,"Use these awesome forms to login or create new account in your project for free."),e.qZA()()()()(),e.TgZ(9,"div",7),e.O4$(),e.TgZ(10,"svg",8),e._UZ(11,"polygon",9),e.qZA()()(),e.kcU(),e.TgZ(12,"div",10)(13,"div",3)(14,"div",11)(15,"div",12)(16,"div",13)(17,"div",14)(18,"small"),e._uU(19,"Sign up with"),e.qZA()(),e.TgZ(20,"div",15)(21,"a",16)(22,"span",17),e._UZ(23,"img",18),e.qZA(),e.TgZ(24,"span",19),e._uU(25,"Github"),e.qZA()(),e.TgZ(26,"a",20)(27,"span",17),e._UZ(28,"img",21),e.qZA(),e.TgZ(29,"span",19),e._uU(30,"Google"),e.qZA()()()(),e.TgZ(31,"div",22)(32,"div",23)(33,"small"),e._uU(34,"Or sign up with credentials"),e.qZA()(),e.TgZ(35,"form",24)(36,"div",25)(37,"div",26)(38,"div",27)(39,"span",28),e._UZ(40,"i",29),e.qZA()(),e._UZ(41,"input",30),e.qZA()(),e.TgZ(42,"div",25)(43,"div",26)(44,"div",27)(45,"span",28),e._UZ(46,"i",31),e.qZA()(),e._UZ(47,"input",32),e.qZA()(),e.TgZ(48,"div",25)(49,"div",33)(50,"div",27)(51,"span",28),e._UZ(52,"i",34),e.qZA()(),e._UZ(53,"input",35),e.qZA()(),e.TgZ(54,"div",36)(55,"small"),e._uU(56,"password strength: "),e.TgZ(57,"span",37),e._uU(58,"strong"),e.qZA()()(),e.TgZ(59,"div",38)(60,"div",39)(61,"div",40),e._UZ(62,"input",41),e.TgZ(63,"label",42)(64,"span",43),e._uU(65,"I agree with the "),e.TgZ(66,"a",44),e._uU(67,"Privacy Policy"),e.qZA()()()()()(),e.TgZ(68,"div",15)(69,"button",45),e._uU(70,"Create account"),e.qZA()()()()()()()())},dependencies:[r._Y,r.JL,r.F]}),o})()},{path:"**",redirectTo:"login"}];let f=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.ez,p.Bz.forChild(y),r.u5,r.UX]}),o})()}}]);