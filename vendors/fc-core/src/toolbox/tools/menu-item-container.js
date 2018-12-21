import{SmartRenderer}from'../../component-interface';import{POINTER,PXSTRING,pluckNumber}from'../../lib/';import MenuItem from'./menu-item';import{DEFAULT_TIMEOUT}from'./helper';import{addDep}from'../../../../fc-core/src/dependency-manager';const AUTO='auto',BLOCK='block',NONE='none';function createMenuItem(a,b={}){let c,d,e,f;if(d=a.attachChild(MenuItem,'item',b.id),d.configure(b),b.menu instanceof Array&&(f=b.menu.length))for(c=d.attachChild(MenuItemContainer,'subContainer','subContainer'),a.config.hasSubMenu=!0,c.configure(),e=0;e<f;e++)c.addItem(b.menu[e])}addDep({name:'manuItemContainerAnimation',type:'animationRule',extension:{"*.menuItemContainer.menuItemContainer":null}});class MenuItemContainer extends SmartRenderer{configureAttributes(){let a=this,b=a.config;a.setStyle(),b.counter=0,b.hasSubMenu=!1,b._defaultStyle={position:'absolute',"z-index":50,top:0+PXSTRING,right:AUTO,left:AUTO,overflow:'hidden',background:'#ffffff',border:'1px solid #646464',"box-shadow":'#999999 2px 2px 5px',padding:'5px 3px',display:'none'}}setStyle(a={}){let b=this,c=b.config;c.hoverOverStyle=a.hoverOverStyle||{background:'#333333',color:'#FFFFFF',cursor:POINTER},c.hoverOutStyle=a.hoverOutStyle||{background:'#FFFFFF',color:'#000000'}}show(){let a,b=this,c=b.config,d=b.getFromEnv('chart'),e=b.getLinkedParent(),f=e.config,g={x:f.x,y:f.y,width:f.width,height:f.height},h=+d.getFromEnv('chartWidth'),i=b.getGraphicalElement('menu','menu').element,j=i.style;clearTimeout(c.hideTimer),j.display='block',a=i.offsetWidth,a+g.x>h?(j.left=AUTO,j.right=h-g.x-g.width+PXSTRING):(j.left=g.x+PXSTRING,j.right=AUTO),j.top=g.y+1.5*g.height+PXSTRING,j.bottom=AUTO,j.display=BLOCK}hide(a={}){let b,c=this,d=c.config,e=c.getGraphicalElement('menu','menu').element;a.instant?e.style.display=NONE:(b=pluckNumber(a.timeout,DEFAULT_TIMEOUT),d.hideTimer=setTimeout(()=>{e.style.display=NONE},b))}addItem(a={}){createMenuItem(this,a)}draw(){let a=this,b=a.config;a.addGraphicalElement({el:'html',attr:{type:'div'},css:b._defaultStyle,component:a,label:'menu',id:'menu'}),a.addEventListener('mouseover',this.show),a.addEventListener('mouseout',this.hide)}getName(){return'menuItemContainer'}getType(){return'menuItemContainer'}}export default MenuItemContainer;