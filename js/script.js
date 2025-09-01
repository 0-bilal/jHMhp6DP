// التاريخ المحدد: 30 أغسطس 2024 الساعة 1:47 مساءً
const endDate = new Date('2024-08-30T13:47:00');

// تحديث العداد الزمني
function updateCounter() {
    const now = new Date();
    const diff = now - endDate;

    // حساب جميع الوحدات الزمنية
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // تحديث القيم في الصفحة
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// إنشاء النجوم البيضاء الواضحة
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numberOfStars = 120; // عدد النجوم

    // إنشاء النجوم العادية
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // تحديد حجم النجم عشوائياً
        const size = Math.random();
        if (size < 0.6) {
            star.classList.add('small');
        } else if (size < 0.8) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }

        // موضع النجم عشوائياً
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // تأخير عشوائي لحركة التلألؤ
        star.style.animationDelay = Math.random() * 4 + 's';
        
        starsContainer.appendChild(star);
    }

    // إنشاء النجوم الساقطة البيضاء
    for (let i = 0; i < 3; i++) {
        const fallingStar = document.createElement('div');
        fallingStar.className = 'falling-star';
        
        // موضع النجمة الساقطة عشوائياً
        fallingStar.style.left = Math.random() * 100 + '%';
        
        // تأخير عشوائي لحركة السقوط
        fallingStar.style.animationDelay = Math.random() * 8 + 's';
        
        starsContainer.appendChild(fallingStar);
    }
}

// بدء تشغيل العداد
function initializeCounter() {
    // تحديث فوري
    updateCounter();
    
    // تحديث كل ثانية
    setInterval(updateCounter, 1000);
}

// بدء تشغيل النجوم
function initializeStars() {
    createStars();
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeCounter();
    initializeStars();
});

// إضافة تأثيرات تفاعلية للوحدات الزمنية
document.addEventListener('DOMContentLoaded', function() {
    const timeUnits = document.querySelectorAll('.time-unit');
    
    timeUnits.forEach(unit => {
        unit.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        unit.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// تأثير تفاعلي لحركة الماوس مع النجوم الكبيرة
document.addEventListener('mousemove', function(e) {
    const stars = document.querySelectorAll('.star.large');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
        // سرعة مختلفة لكل نجمة
        const speed = (index % 3 + 1) * 0.3;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        // تطبيق الحركة التفاعلية
        star.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.abs(x + y) * 0.005})`;
    });
});

// دالة لإعادة إنشاء النجوم إذا لزم الأمر
function regenerateStars() {
    const starsContainer = document.getElementById('starsContainer');
    starsContainer.innerHTML = '';
    createStars();
}

// تأثير عند النقر على الخلفية (اختياري)
document.addEventListener('click', function(e) {
    // إذا كان النقر على الخلفية وليس على العناصر
    if (e.target === document.body || e.target.classList.contains('stars-container')) {
        // إضافة نجمة مؤقتة في مكان النقر
        const tempStar = document.createElement('div');
        tempStar.style.position = 'fixed';
        tempStar.style.left = e.clientX + 'px';
        tempStar.style.top = e.clientY + 'px';
        tempStar.style.width = '3px';
        tempStar.style.height = '3px';
        tempStar.style.background = '#FFFFFF';
        tempStar.style.borderRadius = '50%';
        tempStar.style.pointerEvents = 'none';
        tempStar.style.zIndex = '999';
        tempStar.style.boxShadow = '0 0 10px #FFFFFF';
        tempStar.style.animation = 'fadeOut 1s ease-out forwards';
        
        document.body.appendChild(tempStar);
        
        // إزالة النجمة المؤقتة بعد انتهاء الحركة
        setTimeout(() => {
            if (tempStar.parentNode) {
                tempStar.parentNode.removeChild(tempStar);
            }
        }, 1000);
    }
});

// إضافة تأثير الاختفاء للنجوم المؤقتة
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
    }
`;
document.head.appendChild(style);