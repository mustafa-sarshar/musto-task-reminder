"use strict";(self.webpackChunkmusto_task_reminder=self.webpackChunkmusto_task_reminder||[]).push([[563],{7563:($,C,r)=>{r.r(C),r.d(C,{WelcomePageModule:()=>K});var v=r(6895),b=r(9299),F=r(8520),E=r(727),a=r(4006),c=r(2130),t=r(4650),d=r(8783);let R=(()=>{class e{constructor(o,i,l,s,g){this.appMonitoringService=o,this.utilityService=i,this.authService=l,this.logService=s,this.router=g,this.isDataFetching=!1,this.isDataFetchingSubscription=new E.w0}ngOnInit(){this.isDataFetchingSubscription=this.appMonitoringService.isDataFetching.subscribe(o=>{this.isDataFetching=o})}ngOnDestroy(){this.isDataFetchingSubscription.unsubscribe()}initForm(o){return new a.cw({email:new a.NI({value:o||"",disabled:this.isDataFetching},[a.kI.required,a.kI.email]),password:new a.NI({value:"",disabled:this.isDataFetching},[a.kI.required,a.kI.minLength(this.utilityService.getValidationLengthMin("PASSWORD")),a.kI.maxLength(this.utilityService.getValidationLengthMax("PASSWORD"))])})}handleLogin(o,i,l){this.authService.handleUserLogin(o).subscribe({next:s=>{this.logService.logToConsole(new c.Z("Login was successful!","INFO")),this.logService.logToConsole(new c.Z(s)),this.logService.showNotification(new c.P("LOGIN","SUCCESS")),this.authService.activateUserAutoLogout(1e3*+s.expiresIn),i(),this.router.navigate(["/tasks"])},error:s=>{this.logService.logToConsole(new c.Z("Login Error: "+s.message,"ERROR")),this.logService.showNotification(new c.P("LOGIN","ERROR")),this.appMonitoringService.setIsDataFetchingStatus(!1)}})}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(d.dS),t.LFG(d.tI),t.LFG(d.Tq),t.LFG(d.$V),t.LFG(b.F0))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var A=r(6416),Z=r(5938),u=r(3546),m=r(9549),f=r(4144),h=r(7392),p=r(4859),L=r(6188);function O(e,n){1&e&&(t.TgZ(0,"li"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"MESSAGES.formValidation.user.email")," "))}function P(e,n){1&e&&(t.TgZ(0,"li"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"MESSAGES.formValidation.user.password")," "))}function T(e,n){if(1&e&&(t.TgZ(0,"div",12)(1,"span",13),t._uU(2,"Help:"),t.qZA(),t.TgZ(3,"ul"),t.YNc(4,O,3,3,"li",14),t.YNc(5,P,3,3,"li",14),t.qZA()()),2&e){const o=t.oxw();t.xp6(4),t.Q6J("ngIf",!o.formGroupEl.controls.email.valid&&o.formGroupEl.controls.email.touched&&o.formGroupEl.controls.email.dirty),t.xp6(1),t.Q6J("ngIf",!o.formGroupEl.controls.password.valid&&o.formGroupEl.controls.password.touched&&o.formGroupEl.controls.password.dirty)}}let I=(()=>{class e{constructor(o,i,l,s,g){this.appMonitoringService=o,this.utilityService=i,this.loginService=l,this.dialogRef=s,this.router=g,this.isDataFetching=!1,this.appMonitoringSubscription=new E.w0,this.hidePasswordValue=!0,this.userEmail=""}ngOnInit(){this.formGroupEl=this.loginService.initForm(this.userEmail),this.appMonitoringSubscription=this.appMonitoringService.isDataFetching.subscribe(o=>{this.isDataFetching=o})}ngOnDestroy(){this.handleClosing()}onClickSubmit(){this.appMonitoringService.setIsDataFetchingStatus(!0);const o=new A.eU(this.formGroupEl.value.email,this.formGroupEl.value.password);this.loginService.handleLogin(o,()=>{this.dialogRef.close()})}onClickCancel(){this.dialogRef.close()}handleClosing(){this.appMonitoringService.setIsDataFetchingStatus(!1),this.appMonitoringSubscription.unsubscribe()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(d.dS),t.Y36(d.tI),t.Y36(R),t.Y36(Z.so),t.Y36(b.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-login"]],features:[t._Bn([R])],decls:34,vars:28,consts:[["autoComplete","off",3,"formGroup"],["appearance","outline","color","accent"],["matInput","","type","email","formControlName","email","id","email","email","",3,"placeholder"],["color","default","matSuffix",""],["matInput","","formControlName","password","id","password","autoComplete","off",3,"placeholder","type"],["mat-icon-button","","matSuffix","",3,"click"],["color","default"],[1,"space-flex"],["align","end"],["mat-stroked-button","","type","button",3,"disabled","click"],["mat-stroked-button","","type","button","color","warn",3,"click"],["class","help-box",4,"ngIf"],[1,"help-box"],[1,"help-box__title"],[4,"ngIf"]],template:function(o,i){1&o&&(t.TgZ(0,"form",0)(1,"mat-card")(2,"mat-card-header")(3,"mat-card-title"),t._uU(4),t.ALo(5,"translate"),t.qZA()(),t.TgZ(6,"mat-card-content")(7,"mat-form-field",1)(8,"mat-label"),t._uU(9),t.ALo(10,"translate"),t.qZA(),t._UZ(11,"input",2),t.ALo(12,"translate"),t.TgZ(13,"mat-icon",3),t._uU(14,"mail"),t.qZA()(),t.TgZ(15,"mat-form-field",1)(16,"mat-label"),t._uU(17),t.ALo(18,"translate"),t.qZA(),t._UZ(19,"input",4),t.ALo(20,"translate"),t.TgZ(21,"button",5),t.NdJ("click",function(){return i.hidePasswordValue=!i.hidePasswordValue}),t.TgZ(22,"mat-icon",6),t._uU(23),t.qZA()()()(),t._UZ(24,"mat-card-content",7),t.TgZ(25,"mat-card-footer")(26,"mat-card-actions",8)(27,"button",9),t.NdJ("click",function(){return i.onClickSubmit()}),t._uU(28),t.ALo(29,"translate"),t.qZA(),t.TgZ(30,"button",10),t.NdJ("click",function(){return i.onClickCancel()}),t._uU(31),t.ALo(32,"translate"),t.qZA()()(),t.YNc(33,T,6,2,"div",11),t.qZA()()),2&o&&(t.Q6J("formGroup",i.formGroupEl),t.xp6(4),t.hij(" ",t.lcZ(5,14,"USER_LOGIN.header.title")," "),t.xp6(5),t.hij(" ",t.lcZ(10,16,"FORM_FIELDS.user.email.label")," "),t.xp6(2),t.Q6J("placeholder",t.lcZ(12,18,"FORM_FIELDS.user.email.placeholder")),t.xp6(6),t.hij(" ",t.lcZ(18,20,"FORM_FIELDS.user.password.label")," "),t.xp6(2),t.Q6J("placeholder",t.lcZ(20,22,"FORM_FIELDS.user.password.placeholder"))("type",i.hidePasswordValue?"password":"text"),t.xp6(2),t.uIk("aria-label","Hide password")("aria-pressed",i.hidePasswordValue),t.xp6(2),t.Oqu(i.hidePasswordValue?"visibility_off":"visibility"),t.xp6(4),t.Q6J("disabled",!i.formGroupEl.valid||i.isDataFetching),t.xp6(1),t.hij(" ",t.lcZ(29,24,"USER_LOGIN.actionButtons.login.label")," "),t.xp6(3),t.hij(" ",t.lcZ(32,26,"USER_LOGIN.actionButtons.cancel.label")," "),t.xp6(2),t.Q6J("ngIf",!i.formGroupEl.valid&&i.formGroupEl.touched&&i.formGroupEl.dirty&&(!i.formGroupEl.controls.email.valid&&i.formGroupEl.controls.email.touched&&i.formGroupEl.controls.email.dirty||!i.formGroupEl.controls.password.valid&&i.formGroupEl.controls.password.touched&&i.formGroupEl.controls.password.dirty)))},dependencies:[v.O5,a._Y,a.Fj,a.JJ,a.JL,a.on,a.sg,a.u,u.a8,u.hq,u.dn,u.rt,u.dk,u.n5,m.KE,m.hX,m.R9,f.Nt,h.Hw,p.lW,p.RK,L.X$],styles:["mat-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;overflow:scroll;height:75vh;padding-bottom:2rem}@media all and (max-height: 520px){mat-card[_ngcontent-%COMP%]{justify-content:start;height:95vh}}mat-card-header[_ngcontent-%COMP%], mat-card-actions[_ngcontent-%COMP%]{flex-grow:0}mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column}mat-card-title[_ngcontent-%COMP%]{text-align:center;padding:1rem;color:#fff}form[_ngcontent-%COMP%]{display:flex;flex-direction:column}"]}),e})();var w=r(6454);let G=(()=>{class e{constructor(o,i,l,s,g,_){this.appMonitoringService=o,this.utilityService=i,this.authService=l,this.logService=s,this.localStorageService=g,this.databaseService=_,this.isDataFetching=!1,this.isDataFetchingSubscription=new E.w0}ngOnInit(){this.isDataFetchingSubscription=this.appMonitoringService.isDataFetching.subscribe(o=>{this.isDataFetching=o})}ngOnDestroy(){this.isDataFetchingSubscription.unsubscribe()}initForm(){return new a.cw({username:new a.NI({value:"",disabled:this.isDataFetching},[a.kI.required,a.kI.minLength(this.utilityService.getValidationLengthMin("USERNAME")),a.kI.maxLength(this.utilityService.getValidationLengthMax("USERNAME")),a.kI.pattern(this.utilityService.getValidationPattern("USERNAME"))]),email:new a.NI({value:"",disabled:this.isDataFetching},[a.kI.required,a.kI.email]),birthDate:new a.NI({value:"",disabled:this.isDataFetching},[a.kI.required,this.utilityService.validateAge]),password:new a.NI({value:"",disabled:this.isDataFetching},[a.kI.required,a.kI.minLength(this.utilityService.getValidationLengthMin("PASSWORD")),a.kI.maxLength(this.utilityService.getValidationLengthMax("PASSWORD"))])})}handleRegistration(o,i,l){this.authService.handleUserRegistration(o).subscribe({next:s=>{const g=new A.n5(s.localId,o.email,"",new Date(""),o.username,o.birthDate);this.databaseService.setUserProfileInDatabase(g).subscribe({next:_=>{this.logService.logToConsole(new c.Z("User registered successfully","INFO")),this.logService.logToConsole(new c.Z(g)),this.logService.showNotification(new c.P("REGISTRATION","SUCCESS")),i(s.email),this.appMonitoringService.setIsDataFetchingStatus(!1)},error:_=>{this.logService.logToConsole(new c.Z("Registration error:"+_.message,"ERROR")),this.logService.showNotification(new c.P("REGISTRATION","ERROR")),this.authService.handleDeleteUserAccount(s.idToken).subscribe({next:y=>{this.logService.logToConsole(new c.Z("User account deleted successfully!","INFO")),this.logService.showNotification(new c.P("REGISTRATION","WARN")),this.localStorageService.resetUserDataFromLocalStorage(),this.appMonitoringService.setIsDataFetchingStatus(!1)},error:y=>{this.logService.logToConsole(new c.Z("Deletion error:"+y.message,"ERROR")),this.logService.showNotification(new c.P("REGISTRATION","WARN")),this.localStorageService.resetUserDataFromLocalStorage(),this.appMonitoringService.setIsDataFetchingStatus(!1)}})}})},error:s=>{this.logService.logToConsole(new c.Z("Registration error:"+s.message,"ERROR")),this.logService.showNotification(new c.P("REGISTRATION","ERROR")),this.appMonitoringService.setIsDataFetchingStatus(!1)}})}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(d.dS),t.LFG(d.tI),t.LFG(d.Tq),t.LFG(d.$V),t.LFG(d.n2),t.LFG(d.k9))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();function D(e,n){1&e&&(t.TgZ(0,"li"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"MESSAGES.formValidation.user.username")," "))}function x(e,n){1&e&&(t.TgZ(0,"li"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"MESSAGES.formValidation.user.email")," "))}function U(e,n){1&e&&(t.TgZ(0,"li"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"MESSAGES.formValidation.user.birthDate")," "))}function N(e,n){1&e&&(t.TgZ(0,"li"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"MESSAGES.formValidation.user.password")," "))}function k(e,n){if(1&e&&(t.TgZ(0,"div",14)(1,"span",15),t._uU(2,"Help:"),t.qZA(),t.TgZ(3,"ul"),t.YNc(4,D,3,3,"li",16),t.YNc(5,x,3,3,"li",16),t.YNc(6,U,3,3,"li",16),t.YNc(7,N,3,3,"li",16),t.qZA()()),2&e){const o=t.oxw();t.xp6(4),t.Q6J("ngIf",!o.formGroupEl.controls.username.valid&&o.formGroupEl.controls.username.touched&&o.formGroupEl.controls.username.dirty),t.xp6(1),t.Q6J("ngIf",!o.formGroupEl.controls.email.valid&&o.formGroupEl.controls.email.touched&&o.formGroupEl.controls.email.dirty),t.xp6(1),t.Q6J("ngIf",!o.formGroupEl.controls.birthDate.valid&&o.formGroupEl.controls.birthDate.touched&&o.formGroupEl.controls.birthDate.dirty),t.xp6(1),t.Q6J("ngIf",!o.formGroupEl.controls.password.valid&&o.formGroupEl.controls.password.touched&&o.formGroupEl.controls.password.dirty)}}let J=(()=>{class e{constructor(o,i,l,s,g){this.appMonitoringService=o,this.utilityService=i,this.registrationService=l,this.dialogRef=s,this.dialog=g,this.isDataFetching=!1,this.hidePasswordValue=!0,this.isDataFetchingSubscription=new E.w0}ngOnInit(){this.formGroupEl=this.registrationService.initForm(),this.isDataFetchingSubscription=this.appMonitoringService.isDataFetching.subscribe(o=>{this.isDataFetching=o})}ngOnDestroy(){this.handleClosing()}onClickSubmit(){this.appMonitoringService.setIsDataFetchingStatus(!0);const o=new A.Z9(this.formGroupEl.value.username,this.formGroupEl.value.email,this.formGroupEl.value.birthDate,this.formGroupEl.value.password);this.registrationService.handleRegistration(o,i=>{this.dialogRef.close(),this.dialog.open(I,w.xA).componentInstance.userEmail=i})}onClickCancel(){this.handleClosing()}handleClosing(){this.appMonitoringService.setIsDataFetchingStatus(!1),this.isDataFetchingSubscription.unsubscribe(),this.dialogRef.close()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(d.dS),t.Y36(d.tI),t.Y36(G),t.Y36(Z.so),t.Y36(Z.uw))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-registration"]],features:[t._Bn([G])],decls:49,vars:37,consts:[["autoComplete","off",3,"formGroup"],["appearance","outline","color","accent"],["matInput","","type","text","formControlName","username","id","username",3,"placeholder"],["color","default","matSuffix",""],["matInput","","type","email","formControlName","email","id","email","email","",3,"placeholder"],["matInput","","type","date","formControlName","birthDate","id","birthDate",3,"placeholder"],["matInput","","formControlName","password","placeholder","","id","password","autoComplete","off",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["color","default"],[1,"space-flex"],["align","end"],["mat-stroked-button","","type","button",3,"disabled","click"],["mat-stroked-button","","type","button","color","warn",3,"click"],["class","help-box",4,"ngIf"],[1,"help-box"],[1,"help-box__title"],[4,"ngIf"]],template:function(o,i){1&o&&(t.TgZ(0,"form",0)(1,"mat-card")(2,"mat-card-header")(3,"mat-card-title"),t._uU(4),t.ALo(5,"translate"),t.qZA()(),t.TgZ(6,"mat-card-content")(7,"mat-form-field",1)(8,"mat-label"),t._uU(9),t.ALo(10,"translate"),t.qZA(),t._UZ(11,"input",2),t.ALo(12,"translate"),t.TgZ(13,"mat-icon",3),t._uU(14,"person"),t.qZA()(),t.TgZ(15,"mat-form-field",1)(16,"mat-label"),t._uU(17),t.ALo(18,"translate"),t.qZA(),t._UZ(19,"input",4),t.ALo(20,"translate"),t.TgZ(21,"mat-icon",3),t._uU(22,"mail"),t.qZA()(),t.TgZ(23,"mat-form-field",1)(24,"mat-label"),t._uU(25),t.ALo(26,"translate"),t.qZA(),t._UZ(27,"input",5),t.ALo(28,"translate"),t.TgZ(29,"mat-icon",3),t._uU(30,"calendar_month"),t.qZA()(),t.TgZ(31,"mat-form-field",1)(32,"mat-label"),t._uU(33),t.ALo(34,"translate"),t.qZA(),t._UZ(35,"input",6),t.TgZ(36,"button",7),t.NdJ("click",function(){return i.hidePasswordValue=!i.hidePasswordValue}),t.TgZ(37,"mat-icon",8),t._uU(38),t.qZA()()()(),t._UZ(39,"mat-card-content",9),t.TgZ(40,"mat-card-footer")(41,"mat-card-actions",10)(42,"button",11),t.NdJ("click",function(){return i.onClickSubmit()}),t._uU(43),t.ALo(44,"translate"),t.qZA(),t.TgZ(45,"button",12),t.NdJ("click",function(){return i.onClickCancel()}),t._uU(46),t.ALo(47,"translate"),t.qZA()()(),t.YNc(48,k,8,4,"div",13),t.qZA()()),2&o&&(t.Q6J("formGroup",i.formGroupEl),t.xp6(4),t.hij(" ",t.lcZ(5,17,"USER_REGISTRATION.header.title")," "),t.xp6(5),t.hij(" ",t.lcZ(10,19,"FORM_FIELDS.user.username.label")," "),t.xp6(2),t.Q6J("placeholder",t.lcZ(12,21,"FORM_FIELDS.user.username.placeholder")),t.xp6(6),t.hij(" ",t.lcZ(18,23,"FORM_FIELDS.user.email.label")," "),t.xp6(2),t.Q6J("placeholder",t.lcZ(20,25,"FORM_FIELDS.user.email.placeholder")),t.xp6(6),t.hij(" ",t.lcZ(26,27,"FORM_FIELDS.user.birthDate.label")," "),t.xp6(2),t.Q6J("placeholder",t.lcZ(28,29,"FORM_FIELDS.user.birthDate.placeholder")),t.xp6(6),t.hij(" ",t.lcZ(34,31,"FORM_FIELDS.user.password.label")," "),t.xp6(2),t.Q6J("type",i.hidePasswordValue?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",i.hidePasswordValue),t.xp6(2),t.Oqu(i.hidePasswordValue?"visibility_off":"visibility"),t.xp6(4),t.Q6J("disabled",!i.formGroupEl.valid||i.isDataFetching),t.xp6(1),t.hij(" ",t.lcZ(44,33,"USER_REGISTRATION.actionButtons.signUp.label")," "),t.xp6(3),t.hij(" ",t.lcZ(47,35,"USER_REGISTRATION.actionButtons.cancel.label")," "),t.xp6(2),t.Q6J("ngIf",!i.formGroupEl.valid&&i.formGroupEl.touched&&i.formGroupEl.dirty&&(!i.formGroupEl.controls.username.valid&&i.formGroupEl.controls.username.touched&&i.formGroupEl.controls.username.dirty||!i.formGroupEl.controls.password.valid&&i.formGroupEl.controls.password.touched&&i.formGroupEl.controls.password.dirty||!i.formGroupEl.controls.email.valid&&i.formGroupEl.controls.email.touched&&i.formGroupEl.controls.email.dirty||!i.formGroupEl.controls.birthDate.valid&&i.formGroupEl.controls.birthDate.touched&&i.formGroupEl.controls.birthDate.dirty)))},dependencies:[v.O5,a._Y,a.Fj,a.JJ,a.JL,a.on,a.sg,a.u,u.a8,u.hq,u.dn,u.rt,u.dk,u.n5,m.KE,m.hX,m.R9,f.Nt,h.Hw,p.lW,p.RK,L.X$],styles:["mat-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;overflow:scroll;height:75vh;padding-bottom:2rem}@media all and (max-height: 660px){mat-card[_ngcontent-%COMP%]{height:95vh}}mat-card-header[_ngcontent-%COMP%], mat-card-actions[_ngcontent-%COMP%]{flex-grow:0}mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column}mat-card-title[_ngcontent-%COMP%]{text-align:center;padding:1rem;color:#fff}form[_ngcontent-%COMP%]{display:flex;flex-direction:column}"]}),e})();const W=[{path:"",component:(()=>{class e{constructor(o,i,l){this.dialog=o,this.translateService=i,this.dataFlowService=l,this.appLanguageSubscription=new E.w0}ngOnInit(){this.dataFlowService.applyAppLanguage(),this.appLanguageSubscription=this.dataFlowService.appLanguage.subscribe(o=>{this.translateService.use(o)})}ngOnDestroy(){this.appLanguageSubscription.unsubscribe()}onOpenUserLoginDialog(){this.dialog.open(I,w.xA)}onOpenUserRegistrationDialog(){this.dialog.open(J,w.xA)}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(Z.uw),t.Y36(L.sK),t.Y36(d.nA))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-welcome-page"]],decls:21,vars:18,consts:[[1,"page-container"],[1,"page-header"],["aria-hidden","false","fontIcon","sentiment_very_satisfied","color","accent",3,"ariaLabel"],[1,"page-animation"],["src","https://media0.giphy.com/media/AIPvjOCQ6Gvg9Ll6uR/giphy.gif?cid=ecf05e47k1tjoz740215lzqomosx6dbpih36prhyr2chuwv5&rid=giphy.gif&ct=g","alt","'WELCOME_PAGE.animation.imageAlt' | translate","width","300",3,"title"],["href","https://giphy.com/gifs/love-i-you-chippythedog-AIPvjOCQ6Gvg9Ll6uR","target","_blank","rel","noopener noreferrer",1,"hyper-links"],[1,"page-actions"],["mat-raised-button","","color","default",3,"click"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h1"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t._UZ(5,"mat-icon",2),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"div",3),t._UZ(8,"img",4),t.ALo(9,"translate"),t.TgZ(10,"p")(11,"a",5),t._uU(12),t.ALo(13,"translate"),t.qZA()()(),t.TgZ(14,"div",6)(15,"button",7),t.NdJ("click",function(){return i.onOpenUserLoginDialog()}),t._uU(16),t.ALo(17,"translate"),t.qZA(),t.TgZ(18,"button",7),t.NdJ("click",function(){return i.onOpenUserRegistrationDialog()}),t._uU(19),t.ALo(20,"translate"),t.qZA()()()),2&o&&(t.xp6(3),t.Oqu(t.lcZ(4,6,"WELCOME_PAGE.header.title")),t.xp6(2),t.Q6J("ariaLabel",t.lcZ(6,8,"WELCOME_PAGE.header.titleIconAriaLabel")),t.xp6(3),t.Q6J("title",t.lcZ(9,10,"WELCOME_PAGE.animation.imageTitle")),t.xp6(4),t.Oqu(t.lcZ(13,12,"WELCOME_PAGE.animation.animationLink")),t.xp6(4),t.Oqu(t.lcZ(17,14,"WELCOME_PAGE.actionButtons.login")),t.xp6(3),t.hij("",t.lcZ(20,16,"WELCOME_PAGE.actionButtons.signUp")," "))},dependencies:[h.Hw,p.lW,L.X$],styles:[".page-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:95%;height:100%;margin:0 auto}.page-header[_ngcontent-%COMP%]{padding:1rem;margin:2rem 0;text-align:center;border-radius:.375rem;box-shadow:1px 1px 15px #00000030;width:300px}@media all and (max-width: 576px){.page-header[_ngcontent-%COMP%]{width:85%}}.page-animation[_ngcontent-%COMP%]{padding:1rem;text-align:center;border-radius:.375rem}.page-animation[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:.375rem}@media all and (max-width: 576px){.page-animation[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;margin:0 auto;width:80%}}.page-actions[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100%;z-index:0}.page-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:0 .5rem}"]}),e})(),canActivate:[F.Lt]}];let j=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[b.Bz.forChild(W),b.Bz]}),e})();var S=r(7009);const q=[h.Ps,p.ot,S.ZX];let V=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[q,h.Ps,p.ot,S.ZX]}),e})();const Q=[u.QW,m.lN,f.c,h.Ps,p.ot,S.ZX];let Y=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[Q,u.QW,m.lN,f.c,h.Ps,p.ot,S.ZX]}),e})();var M=r(2775);let B=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[v.ez,a.UX,Y,M.Z]}),e})();const X=[u.QW,m.lN,f.c,h.Ps,p.ot,S.ZX];let z=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[X,u.QW,m.lN,f.c,h.Ps,p.ot,S.ZX]}),e})(),H=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[v.ez,a.UX,z,M.Z]}),e})(),K=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[v.ez,j,V,B,H,M.Z]}),e})()}}]);