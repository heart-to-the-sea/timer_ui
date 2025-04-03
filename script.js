// DOM元素
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const recordBtn = document.getElementById('recordBtn');
const recordList = document.getElementById('recordList');
const secondProgress = document.getElementById('secondProgress');
const timerElement = document.getElementById('timer');

// 星期数组
const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

// 月份数组
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// 保存记录的数组
let timeRecords = [];

// 计时器变量
let timerStartTime = 0;
let timerRunning = false;
let timerInterval;

// 加载页面时检查本地存储中是否有保存的记录
function loadRecords() {
    const savedRecords = localStorage.getItem('timeRecords');
    if (savedRecords) {
        timeRecords = JSON.parse(savedRecords);
        updateRecordList();
    }
}

// 更新时间函数
function updateTime() {
    const now = new Date();
    
    // 获取小时、分钟和秒
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    
    // 格式化时间为两位数
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // 创建闪烁效果（秒数为偶数时冒号可见，奇数时冒号半透明）
    const colon = seconds % 2 === 0 ? ':' : '<span style="opacity: 0.5">:</span>';
    
    // 更新时间显示，包含闪烁的冒号
    timeElement.innerHTML = `${hours}${colon}${minutes}`;
    
    // 更新秒数进度条
    const secondPercentage = ((seconds * 1000 + milliseconds) / 60000) * 100;
    secondProgress.style.width = `${secondPercentage}%`;
    
    // 获取日期信息
    const weekday = weekdays[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    
    // 更新日期显示
    dateElement.textContent = `${weekday}, ${month}${day}日`;
}

// 启动计时器
function startTimer() {
    // 重置计时器
    resetTimer();
    
    // 设置开始时间
    timerStartTime = Date.now();
    timerRunning = true;
    
    // 清除旧的计时器
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // 设置新的计时器，每10毫秒更新一次
    timerInterval = setInterval(updateTimer, 10);
}

// 更新计时器显示
function updateTimer() {
    if (!timerRunning) return;
    
    // 计算经过的时间
    const elapsedTime = Date.now() - timerStartTime;
    
    // 计算分钟、秒和毫秒
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    
    // 格式化为两位数
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMs = milliseconds.toString().padStart(2, '0');
    
    // 更新计时器显示
    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}.${formattedMs}`;
    
    // 当计时器超过3分钟（180000毫秒）时，将页面变为红色
    if (elapsedTime >= 18000) {
        // timerElement.classList.add('timer-warning');
        document.body.classList.add('page-warning');
    } else {
        // timerElement.classList.remove('timer-warning');
        document.body.classList.remove('page-warning');
    }
}

// 重置计时器
function resetTimer() {
    timerRunning = false;
    timerStartTime = 0;
    timerElement.textContent = '00:00.00';
    timerElement.classList.remove('timer-warning');
    document.body.classList.remove('page-warning');
}

// 记录当前时间
function recordTime() {
    const now = new Date();
    
    // 获取时间组件
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // 创建记录对象
    const record = {
        time: `${hours}:${minutes}:${seconds}`,
        timestamp: now.getTime()
    };
    
    // 添加到记录数组
    timeRecords.unshift(record);
    
    // 保存到本地存储
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords));
    
    // 更新UI
    updateRecordList();
    
    // 开始计时器
    startTimer();
    
    // 添加动画效果
    recordBtn.classList.add('active');
    setTimeout(() => {
        recordBtn.classList.remove('active');
    }, 300);
}

// 更新记录列表UI
function updateRecordList() {
    // 清空当前列表
    recordList.innerHTML = '';
    
    // 如果没有记录，显示空状态
    if (timeRecords.length === 0) {
        recordList.innerHTML = '<div class="empty-record">暂无记录</div>';
        return;
    }
    
    // 创建网格容器
    const gridContainer = document.createElement('div');
    gridContainer.className = 'record-grid';
    
    // 添加每条记录
    timeRecords.forEach(record => {
        const recordItem = document.createElement('div');
        recordItem.className = 'record-item';
        recordItem.textContent = record.time;
        gridContainer.appendChild(recordItem);
    });
    
    recordList.appendChild(gridContainer);
}

// 清除所有记录
function clearAllRecords() {
    if (timeRecords.length > 0 && confirm('确定要清除所有记录吗？')) {
        timeRecords = [];
        localStorage.removeItem('timeRecords');
        updateRecordList();
        resetTimer();
    }
}

// 添加按钮点击事件
recordBtn.addEventListener('click', recordTime);

// 添加清除按钮点击事件
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', clearAllRecords);

// 页面加载时加载记录和更新时间，并初始化计时器显示
document.addEventListener('DOMContentLoaded', () => {
    loadRecords();
    updateTime();
    resetTimer();
});

// 更频繁地更新时间以使秒数进度条更平滑
setInterval(updateTime, 50); 