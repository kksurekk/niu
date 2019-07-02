var tops = document.getElementById('top');
window.onscroll=function(){
    var scroll=document.documentElement.scrollTop;
    if(scroll>=1000){
        tops.style.display='block';
        }else{
            tops.style.display='none';
            tops.style.position='' ;
        }
          
    };
var banner = document.getElementById('banner'),
    list=document.getElementById('list'),
    img=document.getElementsByTagName('img')[0];
var arrImg=['images/banner.jpg','images/banner2.jpg'];
var num=0;
var timer=null;
for(var i=0;i<arrImg.length;i++){
    list.innerHTML+='<li></li>';

}
var li=list.getElementsByTagName('li');
function fn(){
    img.src=arrImg[num];
    li[num].className='cur';
}
fn();
function clear(){
    for(var i=0;i<arrImg.length;i++){
        li[i].className='';
    }
}
for(var j=0;j<li.length;j++){
    li[j].index=j;
    li[j].onclick=function(){
        clear();
        img.src=arrImg[this.index];
        li[this.index].className='cur';
        num=this.index;
};

} 
function autoPlay(){
    timer=setInterval(function(){
        num++;
        num%=arrImg.length;
        clear();
        fn();
    },2000);
}
autoPlay();
banner.onmouseover=function(){
    clearInterval(timer);
};
banner.onmouseout=autoPlay;






    
    
