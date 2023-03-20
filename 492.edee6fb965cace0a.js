"use strict";(self.webpackChunkmusto_task_reminder=self.webpackChunkmusto_task_reminder||[]).push([[492],{8520:(R,E,a)=>{a.d(E,{a1:()=>C,Fi:()=>A,Lt:()=>w});var m=a(5698),f=a(4004),i=a(4650),y=a(9493),p=a(9299);let C=(()=>{class s{constructor(r,u){this.dataFlowService=r,this.router=u}canActivate(r,u){return this.dataFlowService.userData.pipe((0,m.q)(1),(0,f.U)(d=>d&&!!d.token||this.router.createUrlTree(["/welcome"])))}}return s.\u0275fac=function(r){return new(r||s)(i.LFG(y.n),i.LFG(p.F0))},s.\u0275prov=i.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),A=(()=>{class s{canDeactivate(r,u,d,F){return r.onCanDeactivate()}}return s.\u0275fac=function(r){return new(r||s)},s.\u0275prov=i.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),w=(()=>{class s{constructor(r,u){this.dataFlowService=r,this.router=u}canActivate(r,u){return this.dataFlowService.userData.pipe((0,m.q)(1),(0,f.U)(d=>!d||this.router.createUrlTree(["/tasks"])))}}return s.\u0275fac=function(r){return new(r||s)(i.LFG(y.n),i.LFG(p.F0))},s.\u0275prov=i.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},4144:(R,E,a)=>{a.d(E,{Nt:()=>D,c:()=>N});var m=a(1281),f=a(3353),i=a(4650),y=a(515),p=a(7579);const C=(0,f.i$)({passive:!0});let A=(()=>{class n{constructor(e,t){this._platform=e,this._ngZone=t,this._monitoredElements=new Map}monitor(e){if(!this._platform.isBrowser)return y.E;const t=(0,m.fI)(e),o=this._monitoredElements.get(t);if(o)return o.subject;const h=new p.x,c="cdk-text-field-autofilled",g=v=>{"cdk-text-field-autofill-start"!==v.animationName||t.classList.contains(c)?"cdk-text-field-autofill-end"===v.animationName&&t.classList.contains(c)&&(t.classList.remove(c),this._ngZone.run(()=>h.next({target:v.target,isAutofilled:!1}))):(t.classList.add(c),this._ngZone.run(()=>h.next({target:v.target,isAutofilled:!0})))};return this._ngZone.runOutsideAngular(()=>{t.addEventListener("animationstart",g,C),t.classList.add("cdk-text-field-autofill-monitored")}),this._monitoredElements.set(t,{subject:h,unlisten:()=>{t.removeEventListener("animationstart",g,C)}}),h}stopMonitoring(e){const t=(0,m.fI)(e),o=this._monitoredElements.get(t);o&&(o.unlisten(),o.subject.complete(),t.classList.remove("cdk-text-field-autofill-monitored"),t.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}}return n.\u0275fac=function(e){return new(e||n)(i.LFG(f.t4),i.LFG(i.R0b))},n.\u0275prov=i.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),_=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({}),n})();var r=a(4006),u=a(3238),d=a(9549);const k=new i.OlP("MAT_INPUT_VALUE_ACCESSOR"),T=["button","checkbox","file","hidden","image","radio","range","reset","submit"];let S=0;const L=(0,u.FD)(class{constructor(n,l,e,t){this._defaultErrorStateMatcher=n,this._parentForm=l,this._parentFormGroup=e,this.ngControl=t,this.stateChanges=new p.x}});let D=(()=>{class n extends L{get disabled(){return this._disabled}set disabled(e){this._disabled=(0,m.Ig)(e),this.focused&&(this.focused=!1,this.stateChanges.next())}get id(){return this._id}set id(e){this._id=e||this._uid}get required(){return this._required??this.ngControl?.control?.hasValidator(r.kI.required)??!1}set required(e){this._required=(0,m.Ig)(e)}get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&(0,f.qK)().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}get value(){return this._inputValueAccessor.value}set value(e){e!==this.value&&(this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=(0,m.Ig)(e)}constructor(e,t,o,h,c,g,v,P,z,b){super(g,h,c,o),this._elementRef=e,this._platform=t,this._autofillMonitor=P,this._formField=b,this._uid="mat-input-"+S++,this.focused=!1,this.stateChanges=new p.x,this.controlType="mat-input",this.autofilled=!1,this._disabled=!1,this._type="text",this._readonly=!1,this._neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(I=>(0,f.qK)().has(I)),this._iOSKeyupListener=I=>{const x=I.target;!x.value&&0===x.selectionStart&&0===x.selectionEnd&&(x.setSelectionRange(1,1),x.setSelectionRange(0,0))};const M=this._elementRef.nativeElement,H=M.nodeName.toLowerCase();this._inputValueAccessor=v||M,this._previousNativeValue=this.value,this.id=this.id,t.IOS&&z.runOutsideAngular(()=>{e.nativeElement.addEventListener("keyup",this._iOSKeyupListener)}),this._isServer=!this._platform.isBrowser,this._isNativeSelect="select"===H,this._isTextarea="textarea"===H,this._isInFormField=!!b,this._isNativeSelect&&(this.controlType=M.multiple?"mat-native-select-multiple":"mat-native-select")}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._platform.IOS&&this._elementRef.nativeElement.removeEventListener("keyup",this._iOSKeyupListener)}ngDoCheck(){this.ngControl&&(this.updateErrorState(),null!==this.ngControl.disabled&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}_focusChanged(e){e!==this.focused&&(this.focused=e,this.stateChanges.next())}_onInput(){}_dirtyCheckNativeValue(){const e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){const e=this._getPlaceholder();if(e!==this._previousPlaceholder){const t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute("placeholder",e):t.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){T.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!(this._isNeverEmpty()||this._elementRef.nativeElement.value||this._isBadInput()||this.autofilled)}get shouldLabelFloat(){if(this._isNativeSelect){const e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}return this.focused||!this.empty}setDescribedByIds(e){e.length?this._elementRef.nativeElement.setAttribute("aria-describedby",e.join(" ")):this._elementRef.nativeElement.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){const e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}}return n.\u0275fac=function(e){return new(e||n)(i.Y36(i.SBq),i.Y36(f.t4),i.Y36(r.a5,10),i.Y36(r.F,8),i.Y36(r.sg,8),i.Y36(u.rD),i.Y36(k,10),i.Y36(A),i.Y36(i.R0b),i.Y36(d.G_,8))},n.\u0275dir=i.lG2({type:n,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:18,hostBindings:function(e,t){1&e&&i.NdJ("focus",function(){return t._focusChanged(!0)})("blur",function(){return t._focusChanged(!1)})("input",function(){return t._onInput()}),2&e&&(i.Ikx("id",t.id)("disabled",t.disabled)("required",t.required),i.uIk("name",t.name||null)("readonly",t.readonly&&!t._isNativeSelect||null)("aria-invalid",t.empty&&t.required?null:t.errorState)("aria-required",t.required)("id",t.id),i.ekj("mat-input-server",t._isServer)("mat-mdc-form-field-textarea-control",t._isInFormField&&t._isTextarea)("mat-mdc-form-field-input-control",t._isInFormField)("mdc-text-field__input",t._isInFormField)("mat-mdc-native-select-inline",t._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:["aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly"},exportAs:["matInput"],features:[i._Bn([{provide:d.Eo,useExisting:n}]),i.qOj,i.TTD]}),n})(),N=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[u.BQ,d.lN,d.lN,_,u.BQ]}),n})()}}]);