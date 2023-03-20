"use strict";(self.webpackChunkmusto_task_reminder=self.webpackChunkmusto_task_reminder||[]).push([[33],{33:(k,C,n)=>{n.r(C),n.d(C,{ProfileModule:()=>_});var m=n(6895),l=n(4006),w=n(9299),y=n(8520),v=n(727),E=n(8962),r=n(2130),e=n(4650),u=n(8783);let M=(()=>{class o{constructor(t,i,s,p,c,h){this.appMonitoringService=t,this.utilityService=i,this.authService=s,this.logService=p,this.databaseService=c,this.dataFlowService=h,this.isDataFetching=!1,this.appMonitoringServiceSubscription=new v.w0}ngOnInit(){this.appMonitoringServiceSubscription=this.appMonitoringService.isDataFetching.subscribe(t=>{this.isDataFetching=t})}ngOnDestroy(){this.appMonitoringService.setIsDataFetchingStatus(!1),this.appMonitoringServiceSubscription.unsubscribe()}initForm(){return new l.cw({username:new l.NI({value:"",disabled:this.isDataFetching},[l.kI.minLength(this.utilityService.getValidationLengthMin("USERNAME")),l.kI.maxLength(this.utilityService.getValidationLengthMax("USERNAME")),l.kI.pattern(this.utilityService.getValidationPattern("USERNAME"))]),birthDate:new l.NI({value:"",disabled:this.isDataFetching},[this.utilityService.validateAge])})}stillEnteringForm(t){let i=!1;return Object.keys(t.value).forEach(s=>{t.controls[s].value.length>0&&(i=!0)}),i}handleDeleteAccount(t,i,s){this.authService.handleDeleteUserAccount(t.token).subscribe({next:p=>{this.logService.logToConsole(new r.Z("The account is deleted successfully!","INFO")),this.databaseService.deleteUserProfileFromDatabase(t.uid).subscribe({next:c=>{this.logService.logToConsole(new r.Z("User profile is deleted successfully!","INFO")),this.logService.showNotification(new r.P("The account is deleted successfully!","SUCCESS")),this.authService.handleUserLogout(),this.appMonitoringService.setIsDataFetchingStatus(!1)},error:c=>{this.logService.logToConsole(new r.Z("User profile could not be deleted!","ERROR")),this.logService.showNotification(new r.P(c.message,"ERROR")),this.authService.handleUserLogout(),this.appMonitoringService.setIsDataFetchingStatus(!1)}})},error:p=>{this.logService.logToConsole(new r.Z("Deletion error:"+p.message,"ERROR")),this.logService.showNotification(new r.P(p.message,"ERROR")),this.appMonitoringService.setIsDataFetchingStatus(!1)}})}handleApplyChanges(t,i,s,p){this.databaseService.updateUserProfileDataInDatabase(t.uid,i).subscribe({next:c=>{this.logService.logToConsole(new r.Z("User profile is updated successfully!","INFO")),this.logService.logToConsole(new r.Z(c)),this.logService.showNotification(new r.P("User profile is updated successfully!","SUCCESS")),this.databaseService.getUserProfileDataFromDatabase(t.uid).subscribe({next:h=>{const g=this.dataFlowService.getUserData();g.username=h.username,g.birthDate=new Date(h.birthDate),this.dataFlowService.setUserData(g),s(),this.logService.logToConsole(new r.Z("User data synced successfully!","INFO")),this.logService.logToConsole(new r.Z(g)),this.logService.showNotification(new r.P("User profile is updated successfully!","SUCCESS"))},error:h=>{this.logService.logToConsole(new r.Z("Update data could not get retrieved!"+h.message,"ERROR")),this.logService.showNotification(new r.P(h.message,"ERROR")),this.appMonitoringService.setIsDataFetchingStatus(!1)}}),this.appMonitoringService.setIsDataFetchingStatus(!1)},error:c=>{this.logService.logToConsole(new r.Z("User profile could not be updated!"+c.message,"ERROR")),this.logService.showNotification(new r.P(c.message,"ERROR")),this.appMonitoringService.setIsDataFetchingStatus(!1)}})}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(u.dS),e.LFG(u.tI),e.LFG(u.Tq),e.LFG(u.$V),e.LFG(u.k9),e.LFG(u.nA))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac}),o})();var Z=n(340),F=n(6454),U=n(5938),d=n(3546),f=n(9549),S=n(4144),b=n(4859),D=n(7392);const A=["btnApplyChanges"];function T(o,a){if(1&o&&(e.TgZ(0,"li"),e._uU(1),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.utilityService.getValidationMessage("USERNAME")," ")}}function I(o,a){if(1&o&&(e.TgZ(0,"li"),e._uU(1),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.utilityService.getValidationMessage("BIRTH_DATE")," ")}}function O(o,a){if(1&o&&(e.TgZ(0,"div",16)(1,"span",17),e._uU(2,"Help:"),e.qZA(),e.TgZ(3,"ul"),e.YNc(4,T,2,1,"li",18),e.YNc(5,I,2,1,"li",18),e.qZA()()),2&o){const t=e.oxw();e.xp6(4),e.Q6J("ngIf",!t.formGroupEl.controls.username.valid&&t.formGroupEl.controls.username.touched&&t.formGroupEl.controls.username.dirty),e.xp6(1),e.Q6J("ngIf",!t.formGroupEl.controls.birthDate.valid&&t.formGroupEl.controls.birthDate.touched&&t.formGroupEl.controls.birthDate.dirty)}}const R=[{path:"",component:(()=>{class o{constructor(t,i,s,p,c,h){this.appMonitoringService=t,this.logService=i,this.dataFlowService=s,this.profileService=p,this.utilityService=c,this.dialog=h,this.userData=null,this.isDataFetching=!1,this.hidePasswordValue=!0,this.appMonitoringServiceSubscription=new v.w0,this.dataFlowServiceSubscription=new v.w0}ngOnInit(){this.appMonitoringService.setIsDataFetchingStatus(!0),this.formGroupEl=this.profileService.initForm(),this.appMonitoringServiceSubscription=this.appMonitoringService.isDataFetching.subscribe(t=>{this.isDataFetching=t}),this.dataFlowServiceSubscription=this.dataFlowService.userData.subscribe(t=>{this.userData=t,this.logService.logToConsole(new r.Z("User Data loaded @Tasks","INFO")),this.logService.logToConsole(new r.Z(t)),this.appMonitoringService.setIsDataFetchingStatus(!1)})}ngOnDestroy(){this.appMonitoringService.setIsDataFetchingStatus(!1),this.appMonitoringServiceSubscription.unsubscribe(),this.dataFlowServiceSubscription.unsubscribe()}onCanDeactivate(){if(this.profileService.stillEnteringForm(this.formGroupEl)||this.isDataFetching){const t=this.dialog.open(E.z,F.KO);return t.componentInstance.confirmationDialogBox=new Z.O("Be careful!","If you leave the page now, you will discard the changes!","YES/NO"),t.afterClosed()}return!0}onClickDeleteAccount(){if(this.userData.username){const t=this.dialog.open(E.z,F.KO);t.componentInstance.confirmationDialogBox=new Z.O("Be careful!","Do you really want to delete your account?","YES/NO"),t.afterClosed().subscribe(i=>{i&&this.profileService.handleDeleteAccount(this.userData)})}}onClickReset(){this.formGroupEl.reset({username:"",birthDate:""})}onClickApplyChanges(){const t={};this.formGroupEl.controls.username.value&&(t.username=this.formGroupEl.controls.username.value),this.formGroupEl.controls.birthDate.value&&(t.birthDate=this.formGroupEl.controls.birthDate.value),this.profileService.handleApplyChanges(this.userData,t,()=>this.formGroupEl.reset({username:"",birthDate:""}))}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(u.dS),e.Y36(u.$V),e.Y36(u.nA),e.Y36(M),e.Y36(u.tI),e.Y36(U.uw))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-profile"]],viewQuery:function(t,i){if(1&t&&e.Gf(A,5),2&t){let s;e.iGM(s=e.CRH())&&(i.btnApplyChangesEl=s.first)}},features:[e._Bn([M])],decls:52,vars:10,consts:[[1,"profile__container"],[1,"profile__item"],[1,"profile__title"],[1,"profile__body"],[1,"profile__userInfo"],[1,"page-actions"],["mat-stroked-button","","color","warn",3,"disabled","click"],["autoComplete","off",3,"formGroup"],["appearance","outline","color","accent"],["matInput","","type","text","formControlName","username","placeholder","username","id","username"],["color","default","matSuffix",""],["matInput","","type","date","formControlName","birthDate","placeholder","birth","id","birth"],["align","end",1,"page-actions"],["mat-stroked-button","","type","button",3,"disabled","click"],["mat-stroked-button","","color","warn","type","button",3,"click"],["class","help-box",4,"ngIf"],[1,"help-box"],[1,"help-box__title"],[4,"ngIf"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title",2),e._uU(4,"User Info"),e.qZA()(),e.TgZ(5,"mat-card-content",3)(6,"mat-card-subtitle",4)(7,"span"),e._uU(8,"Username:"),e.qZA(),e.TgZ(9,"p")(10,"strong"),e._uU(11),e.qZA()(),e.TgZ(12,"span"),e._uU(13,"Birth date:"),e.qZA(),e.TgZ(14,"p")(15,"strong"),e._uU(16),e.ALo(17,"date"),e.qZA()(),e.TgZ(18,"span"),e._uU(19,"Email:"),e.qZA(),e.TgZ(20,"p")(21,"strong"),e._uU(22),e.qZA()()()(),e.TgZ(23,"mat-card-footer")(24,"mat-card-actions",5)(25,"button",6),e.NdJ("click",function(){return i.onClickDeleteAccount()}),e._uU(26," Delete Account "),e.qZA()()()(),e.TgZ(27,"mat-card",1)(28,"form",7)(29,"mat-card-header")(30,"mat-card-title",2),e._uU(31,"Update Form"),e.qZA()(),e.TgZ(32,"mat-card-content")(33,"mat-form-field",8)(34,"mat-label"),e._uU(35,"Username"),e.qZA(),e._UZ(36,"input",9),e.TgZ(37,"mat-icon",10),e._uU(38,"person"),e.qZA()(),e.TgZ(39,"mat-form-field",8)(40,"mat-label"),e._uU(41,"Birth date"),e.qZA(),e._UZ(42,"input",11),e.TgZ(43,"mat-icon",10),e._uU(44,"calendar_month"),e.qZA()()(),e.TgZ(45,"mat-card-footer")(46,"mat-card-actions",12)(47,"button",13),e.NdJ("click",function(){return i.onClickApplyChanges()}),e._uU(48,"Apply Changes"),e.qZA(),e.TgZ(49,"button",14),e.NdJ("click",function(){return i.onClickReset()}),e._uU(50,"Reset"),e.qZA()()(),e.YNc(51,O,6,2,"div",15),e.qZA()()()),2&t&&(e.xp6(11),e.Oqu(i.userData.username),e.xp6(5),e.Oqu(e.xi3(17,7,i.userData.birthDate,"fullDate")),e.xp6(6),e.Oqu(i.userData.email),e.xp6(3),e.Q6J("disabled",i.isDataFetching||!i.userData.username),e.xp6(3),e.Q6J("formGroup",i.formGroupEl),e.xp6(19),e.Q6J("disabled",!i.formGroupEl.valid||i.isDataFetching),e.xp6(4),e.Q6J("ngIf",!i.formGroupEl.valid&&i.formGroupEl.touched&&i.formGroupEl.dirty&&(!i.formGroupEl.controls.username.valid&&i.formGroupEl.controls.username.touched&&i.formGroupEl.controls.username.dirty||!i.formGroupEl.controls.birthDate.valid&&i.formGroupEl.controls.birthDate.touched&&i.formGroupEl.controls.birthDate.dirty)))},dependencies:[m.O5,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,d.a8,d.hq,d.dn,d.rt,d.dk,d.$j,d.n5,f.KE,f.hX,f.R9,S.Nt,b.lW,D.Hw,m.uU],styles:[".profile__container[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;width:100%}.profile__title[_ngcontent-%COMP%]{padding:2rem;text-align:center;font-weight:700}.profile__item[_ngcontent-%COMP%]{flex:1 1 auto;display:flex;flex-direction:column;align-items:center;margin:1.5rem;max-width:300px;width:100%;box-shadow:none;background-color:transparent}@media all and (max-width: 550px){.profile__item[_ngcontent-%COMP%]:first-child{padding-bottom:1rem;border-bottom:1px solid lightgray}}.profile__body[_ngcontent-%COMP%]{padding-top:.5rem;margin-bottom:1rem}.profile__userInfo[_ngcontent-%COMP%]{margin-bottom:.5;overflow:hidden}.profile__userInfo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{overflow-wrap:break-word;width:270px}.profile__userInfo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-child(even){margin-bottom:1rem}form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto}mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{z-index:0}"]}),o})(),canActivate:[y.a1],canDeactivate:[y.Fi]}];let G=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[w.Bz.forChild(R),w.Bz]}),o})();var P=n(7009);const x=[d.QW,f.lN,S.c,b.ot,D.Ps,P.ZX];let N=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[x,d.QW,f.lN,S.c,b.ot,D.Ps,P.ZX]}),o})(),_=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[m.ez,G,l.UX,N]}),o})()}}]);