import{animHelperFN}from'../../../../fc-core/src/lib';export default{"initial.dataset.column":function(){var a,b=Math.sign,c=this,d=c.getFromEnv('chart'),e=d.config.yDepth||0,f='y',g='height',h='x',i='width',j=c.getFromEnv('yAxis'),k=c.getFromEnv('xAxis'),l=function(a,b){var k,l,m,n,o=c.config,p=b&&b.graphics&&b.graphics.element,q=a.attr,r=j.getPixel(j.getAxisBase())+(d.isBar?-e:e),s={},t=o.oldZeroAxisPos,u=.7;if(k=p.attr(),s[f]=l=k[f],s[g]=k[g],s[h]=k[h],s[i]=k[i],m=k[f]+k[g],r!==t&&(0<=t-r?(l>r&&l<=t+u&&(s[f]=r,m>t&&(s[g]=m-s[f])),m>r&&m<=t+u&&(s[g]=r-(s[f]||0===s[f]?s[f]:l))):(l<r&&l>=t-u&&(s[f]=r,m>r&&(s[g]=m-s[f])),m<r&&m>=t-u&&(s[g]=r-(s[f]||0===s[f]?s[f]:l))),n=!0),c.config.catDiff&&(s[h]=q[h],s[i]=q[i],n=!0),b._plot_1Start=s,n)return{finalAttr:s,slot:'axis'}};return{"rect.appearing":function(a){var l,m,n,o,p=j.getPixel(j.getAxisBase())+(d.isBar?-e:e),q=a.props&&a.props.originalIndex||a.index,r=c.components.data[q],s=a.attr;return k.config.isVertical&&(f='x',g='width',h='y',i='height'),l=s[f],m=s[g],o=b(l+m/2-p),n=1===o?l:l+m,r._posWRT0=o,[{initialAttr:function(){var a={};return a[f]=n,a.opacity=0,a[g]=0,a},finalAttr:{opacity:1},startEnd:function(){var b=a.length;return animHelperFN.getTimeByValue(animHelperFN.animByWeight(a.index,b,.6),{startPx:p,endPx:1===o?c.config.yAxisMaxPixel:c.config.yAxisMinPixel},{startPx:n,endPx:1===o?s[f]+s[g]:s[f]})},hookFn:function(){this.attr({opacity:1})},effect:'linear',slot:'plot'}]},"rect.updating":function(m){var n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P=[],Q=c.components.data[m.props&&m.props.originalIndex||m.index],R=m.attr,S=Q&&Q.graphics&&Q.graphics.element,T=j.getPixel(j.getAxisBase())+(d.isBar?-e:e),U=0,V=c.getFromEnv('numColDiff'),W={};return k.config.isVertical&&(f='x',g='width',h='y',i='height'),(O=l(m,Q))&&P.push(O),y=Q.prevDataObj,z=y&&y._plot_1Start,F=y&&y._plot_1End,A=y&&y._plot_2Start,B=Q.oldPrevDataObj,C=Q.oldPrevDataObj&&Q.oldPrevDataObj._plot_1End,W=Q._plot_1Start,n=W[f],o=W[g],p=n+o,q=n+o/2,r=R[f],s=R[g],t=r+s,u=r+s/2,D=(p+t)/2,G=b(q-T),H=b(u-T),w={},x={},x[f]=w[f]=(n+r)/2,x[g]=w[g]=(o+s)/2,o?G===H?y!==B&&(I=C||!!(F&&b(F[f]+F[g]/2-T)===G)&&F,J=I?I[f]+(1===G?I[g]:0):T,1===G?(x[f]=w[f]=J,x[g]=w[g]=D-w[f]):x[g]=w[g]=J-w[f],v=!0):(x[g]=w[g]=0,w[f]=B&&B._oldPosWRT0===G?C[f]+(1===G?C[g]:0):T,x[f]=A?A[f]+(1===H?A[g]:0):T,E=v=!0):y&&y._oldPosWRT0===H||0===c.stackIndex?(M={},M[g]=0,M[f]=z?z[f]+(0<y._posWRT0?z[g]:0):T,Q._posWRT0=H,Q._plot_1Start=M,x[f]=w[f]=(M[f]+r)/2,x[g]=w[g]=s/2):q===T&&(H===Q._posWRT0?(v=!0,w[f]=1===H?T:T-w[g]):U=.5),0>V?(w[h]=R[h],w[i]=R[i],v=!0):0<V?U=.5:(W[h]!==R[h]||W[i]!=R[i])&&(.5==U?(M={},M[h]=R[h],M[i]=R[i],K=function(){E&&S.attr(x),S.attr(M)}):(w[h]=R[h],w[i]=R[i],v=!0,K&&(L=function(){S.attr(M)},K=a))),v&&(P.push({finalAttr:w,startEnd:{start:0,end:.5},hookFn:L,slot:'plot'}),U=.5),K||(K=function(){E&&S.attr(x)}),P.push({effect:'linear',startEnd:{start:U,end:1},finalAttr:{x:R.x,y:R.y,width:R.width,height:R.height},callback:function(){(null===Q.config.setValue||Q.config.setValue===a)&&this.hide()},hookFn:K,slot:'plot'}),N=Object.assign({},R),delete N.x,delete N.y,delete N.width,delete N.height,P.push({finalAttr:N,effect:'linear',slot:'plot'}),Q._plot_1End=w,Q._plot_2Start=x,Q._oldPosWRT0=Q._posWRT0,Q._posWRT0=H,P},"rect._disappearing":function(a){var b,h,i,k,m,n=j.getPixel(j.getAxisBase())+(d.isBar?-e:e),o=c.components.removeDataArr,p=o&&o[a.props&&a.props.originalIndex||a.index]||c.components.data[a.props&&a.props.originalIndex||a.index],q=p&&p.graphics&&p.graphics.element,r=p.oldPrevDataObj&&p.oldPrevDataObj._plot_1End,s=[];if(q)return(k=l(a,p))&&s.push(k),j.config.isVertical||(f='x',g='width'),m=p._plot_1Start,h=m[f],b=h+m[g]/2>n?r?r[f]+r[g]:h:r?r[f]:n,i={},i[f]=b,i[g]=0,i.width=p._width,i.x=p._xPos,s.push({startEnd:{start:0,end:1>c.getFromEnv('numOfColumns')?1:.5},finalAttr:i,slot:'plot'}),p._plot_1End=a.finalAttr,s},"plotLabel.appearing":[{initialAttr:{opacity:0},slot:'final'}],"plotLabel._disappearing":[{hookFn:function(){this.hide()},slot:'initial'}],"plotLabel.updating":[{hookFn:function(){this.hide()},slot:'initial'},{hookFn:function(){this.show()},initialAttr:{opacity:0},finalAttr:{opacity:1},slot:'final'}],"group.appearing":a=>'label-group'===a.attr.name?[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:'final'}]:[{initialAttr:{opacity:1},finalAttr:{opacity:1},slot:'final'}],"*":null}}};