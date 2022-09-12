window.onload = function () {
 
   //声明变量
	var containerBox=getTag('.container');
	var leftBox=getTag('.arrow > a:first-child');
	var rightBox = getTag('.arrow a:last-child');
	var olLis=getTags('ol li');
	var count = 0;
    var flag = true;
	var ulBox=getTag('ul');
	var img=getTag('ul li:first-child');
	var imgWidth=getStyle(img,'width');
	var lastIndex = ulBox.children.length - 2;
	var timer=null;
	ulBox.style.width=ulBox.children.length*parseInt(imgWidth)+'px';
	ulBox.style.left=-parseInt(imgWidth)+'px'


     //移入盒子显示左右箭头
	containerBox.onmouseenter=function()
	{
		leftBox.style.display='block';
		rightBox.style.display='block';
		clearInterval(timer);
		
	}
	//移出时候隐藏左右箭头
	containerBox.onmouseleave=function()
	{
		leftBox.style.display='none';
		rightBox.style.display='none';
		clearInterval(timer);
        timer = setInterval(rightBox.onclick, 1500);
	}
    
	  
 //小圆点功能
	olLis.forEach(function (el, index) {
        el.onclick = function () {
            paiTa(index);
            // 移动的是ulBox
            move(index);
            // 统一索引
            count = index;
        }
    })

     
     // 右按钮功能
     rightBox.onclick = function() {
         if (flag) {
             flag = false;
             count++;
			 move(count);
			 if (count >= ulBox.children.length - 2) return paiTa(0);
			 paiTa(count); 
         }
     }
	 //左按钮功能
     leftBox.onclik=function(){
	     if (flag) {
		   flag=flase;
		   count--;
		   move(count);
		    if (count < 0) return paiTa(5);
		     paiTa(count);
         }
     }



      //监听transitionend过渡是否执行完毕
     ulBox.ontransitionend = function () {
	      if (count < 0) {
	 	   // 已经去往复制的最后一张了
		   ulBox.style.transition = 'none';
		   ulBox.style.left = -parseInt(imgWidth) * lastIndex + 'px';
		   count = lastIndex - 1;
	     } else if (count >= lastIndex) {
		   // 已经去往复制的第一张了
		   ulBox.style.transition = 'none';
		   ulBox.style.left = -parseInt(imgWidth) + 'px';
		   count = 0;
	     }
         console.log('运行了');
	      flag = true;
   }



   //封装函数区域
	//获取单个元素
	function getTag(element) {
		return document.querySelector(element);
	}
	//获取多个元素，注意遍历
	function getTags(element) {
		return document.querySelectorAll(element);
	}
	/**
	 * 获取元素的计算属性
	 * @param Elment ele 元素
	 * @param String attr css属性名
	 * @param String 计算属性值
	 */
	function getStyle(ele, attr) {
		if (window.getComputedStyle) {
			return getComputedStyle(ele)[attr];
		} else {
			return ele.currentStyle[attr];
		}
	}
	// 排他思想封装
	function paiTa(n) {
		// 排他思想
		olLis.forEach(function (item, i) {
			item.removeAttribute("class");
			// 同步处理图片
		});
		olLis[n].className = "current";
	}
     //位移封装
	function move(n) {
        ulBox.style.transition = 'left 0.35s ease-in-out';
        ulBox.style.left = -parseInt(imgWidth) * (n + 1) + 'px';
    }
	var timer = setInterval(rightBox.onclick, 1500);
};
 