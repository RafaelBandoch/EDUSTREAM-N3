document.addEventListener('DOMContentLoaded', function() {
    // Configuração dos mini gráficos dos cards
    const createMiniChart = (canvasId, color) => {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
       
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', ''],
                datasets: [{
                    data: [20, 35, 25, 45, 30, 50],
                    borderColor: color,
                    backgroundColor: color + '20',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }
        });
    };
 
    // Criar mini gráficos
    createMiniChart('coursesChart', '#10b981');
    createMiniChart('studentsChart', '#10b981');
    createMiniChart('revenueChart', '#10b981');
 
    // Gráfico de linha - Alunos por curso
    const studentsCtx = document.getElementById('studentsPerCourseChart');
    if (studentsCtx) {
        new Chart(studentsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Curso 1',
                        data: [300, 320, 310, 330, 340, 350, 360, 370, 380, 390, 400, 410],
                        borderColor: '#8B5CF6',
                        backgroundColor: '#8B5CF620',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Curso 2',
                        data: [250, 260, 255, 270, 280, 290, 300, 310, 320, 330, 340, 350],
                        borderColor: '#A78BFA',
                        backgroundColor: '#A78BFA20',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Curso 3',
                        data: [200, 210, 205, 220, 230, 240, 250, 260, 270, 280, 290, 300],
                        borderColor: '#C4B5FD',
                        backgroundColor: '#C4B5FD20',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Curso 4',
                        data: [150, 160, 155, 170, 180, 190, 200, 210, 220, 230, 240, 250],
                        borderColor: '#DDD6FE',
                        backgroundColor: '#DDD6FE20',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                }
            }
        });
    }
 
    // Gráfico de barras - Cursos mais vendidos
    const topCoursesCtx = document.getElementById('topCoursesChart');
    if (topCoursesCtx) {
        new Chart(topCoursesCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Curso 1',
                        data: [120, 80, 60, 100, 90, 70, 50, 80, 100, 90, 110, 130],
                        backgroundColor: '#8B5CF6'
                    },
                    {
                        label: 'Curso 2',
                        data: [100, 70, 50, 80, 70, 60, 40, 60, 80, 70, 90, 110],
                        backgroundColor: '#A78BFA'
                    },
                    {
                        label: 'Curso 3',
                        data: [80, 60, 40, 60, 50, 40, 30, 40, 60, 50, 70, 90],
                        backgroundColor: '#C4B5FD'
                    },
                    {
                        label: 'Curso 4',
                        data: [60, 40, 30, 40, 30, 20, 20, 20, 40, 30, 50, 70],
                        backgroundColor: '#DDD6FE'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                }
            }
        });
    }
 
    // Menu mobile toggle
    const createMobileToggle = () => {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.className = 'mobile-menu-toggle';
       
        document.body.appendChild(toggleBtn);
       
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
       
        // Fechar sidebar ao clicar fora
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !toggleBtn.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    };
   
    createMobileToggle();
});