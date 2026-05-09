document.addEventListener('DOMContentLoaded', () => {
    const tasks = {
        'task-tiktok': false,
        'task-youtube': false,
        'task-telegram': false,
        'task-smartlink': false
    };

    const unlockBtn = document.getElementById('unlock-btn');
    const destinationUrl = 'https://khoindvn.io.vn';

    // Add click listeners to all tasks
    Object.keys(tasks).forEach(taskId => {
        const element = document.getElementById(taskId);
        element.addEventListener('click', () => {
            // Mark as completed after a short delay to simulate verification
            setTimeout(() => {
                tasks[taskId] = true;
                element.classList.add('completed');
                checkCompletion();
            }, 1000);
        });
    });

    function checkCompletion() {
        const allDone = Object.values(tasks).every(status => status === true);
        if (allDone) {
            unlockBtn.disabled = false;
            unlockBtn.classList.add('active');
            unlockBtn.innerText = 'Bấm Để Tiếp Tục';
        }
    }

    unlockBtn.addEventListener('click', () => {
        if (!unlockBtn.disabled) {
            // Success animation or direct redirect
            unlockBtn.innerText = 'Đang chuyển hướng...';
            setTimeout(() => {
                window.location.href = destinationUrl;
            }, 800);
        }
    });
});
