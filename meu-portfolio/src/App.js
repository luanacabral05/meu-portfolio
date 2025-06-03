import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, User, Briefcase, GraduationCap, Gamepad2, Home, Eye, RefreshCw, AlertCircle } from 'lucide-react';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [gameGuess, setGameGuess] = useState('');
  const [gameAttempts, setGameAttempts] = useState([]);
  const [gameSecret, setGameSecret] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [quote, setQuote] = useState('');

  // Inicializar jogo
  const initGame = () => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const secret = [];
    while (secret.length < 4) {
      const randomDigit = digits[Math.floor(Math.random() * digits.length)];
      if (!secret.includes(randomDigit)) {
        secret.push(randomDigit);
      }
    }
    setGameSecret(secret.join(''));
    setGameAttempts([]);
    setGameOver(false);
    setGameWon(false);
    setGameGuess('');
  };

  // Verificar tentativa
  const checkGuess = (guess, secret) => {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        bulls++;
      } else if (secret.includes(guess[i])) {
        cows++;
      }
    }

    return { bulls, cows };
  };

  // Fazer tentativa no jogo
  const makeGuess = () => {
    if (gameGuess.length !== 4 || !/^\d{4}$/.test(gameGuess)) {
      alert('Digite exatamente 4 dígitos únicos!');
      return;
    }

    if (new Set(gameGuess).size !== 4) {
      alert('Os dígitos devem ser únicos!');
      return;
    }

    const result = checkGuess(gameGuess, gameSecret);
    const newAttempt = {
      guess: gameGuess,
      bulls: result.bulls,
      cows: result.cows,
      attempt: gameAttempts.length + 1
    };

    const newAttempts = [newAttempt, ...gameAttempts];
    setGameAttempts(newAttempts);
    setGameGuess('');

    if (result.bulls === 4) {
      setGameWon(true);
      setGameOver(true);
    } else if (newAttempts.length >= 10) {
      setGameOver(true);
    }
  };

  // Buscar dados da API do clima
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-8.0476&longitude=-34.8770&current_weather=true')
      .then(response => response.json())
      .then(data => setWeatherData(data.current_weather))
      .catch(error => console.log('Erro ao buscar clima:', error));
  }, []);

  // Buscar citação inspiracional
  useEffect(() => {
    fetch('https://api.quotable.io/random?tags=motivational')
      .then(response => response.json())
      .then(data => setQuote(data.content))
      .catch(error => console.log('Erro ao buscar citação:', error));
  }, []);

  // Inicializar jogo ao carregar
  useEffect(() => {
    initGame();
  }, []);

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-purple-800 to-blue-800 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Meu Portfólio
        </h1>
        <div className="flex space-x-6">
          {[
            { key: 'home', label: 'Home', icon: Home },
            { key: 'about', label: 'Sobre', icon: User },
            { key: 'academic', label: 'Acadêmico', icon: GraduationCap },
            { key: 'professional', label: 'Profissional', icon: Briefcase },
            { key: 'projects', label: 'Projetos', icon: Code },
            { key: 'game', label: 'Jogo', icon: Gamepad2 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCurrentPage(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${currentPage === key ? 'bg-white bg-opacity-30' : ''
                }`}
            >
              <Icon size={16} />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <div className="mb-8 relative">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <img
                src="foto.jpg"
                alt="Minha Foto"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

          </div>

          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Desenvolvedora Full Stack
          </h1>

          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Apaixonada por tecnologia e inovação, criando soluções digitais que fazem a diferença.
          </p>

          {weatherData && (
            <div className="mb-8 p-4 bg-white bg-opacity-10 rounded-lg inline-block">
              <p className="text-lg">
                🌡️ Clima atual em Recife: {weatherData.temperature}°C
              </p>
            </div>
          )}

          {quote && (
            <div className="mb-12 p-6 bg-white bg-opacity-10 rounded-lg max-w-2xl mx-auto">
              <p className="text-lg italic">"{quote}"</p>
            </div>
          )}

          <div className="flex justify-center space-x-6 mb-12">
            <a href="https://github.com/luanacabral05" className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/luana-cabral-8562232ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:cabral.luanasilva@gmail.com?subject=Contato via Portfólio&body=Olá, gostaria de entrar em contato!" className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Mail size={20} />
              <span>Contato</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
              <Code size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Frontend</h3>
              <p className="text-gray-300">React, Next.js, Vue.js, HTML5, CSS3, JavaScript</p>
            </div>

            <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
              <Briefcase size={48} className="mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Backend</h3>
              <p className="text-gray-300">Node.js, Python, Express, MongoDB, PostgreSQL</p>
            </div>

            <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
              <GraduationCap size={48} className="mx-auto mb-4 text-pink-400" />
              <h3 className="text-xl font-bold mb-2">Outras Skills</h3>
              <p className="text-gray-300">Git, Docker, AWS, DevOps, UI/UX Design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Sobre o Projeto
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Tecnologias Frontend</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• React 18 - Biblioteca JavaScript para interfaces</li>
              <li>• Tailwind CSS - Framework CSS utilitário</li>
              <li>• Lucide React - Ícones modernos</li>
              <li>• JavaScript ES6+ - Linguagem de programação</li>
              <li>• CSS Grid/Flexbox - Layout responsivo</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-green-400">APIs Integradas</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Open-Meteo API - Dados meteorológicos</li>
              <li>• Quotable API - Citações inspiracionais</li>
              <li>• Fetch API - Requisições HTTP</li>
              <li>• Geolocation API - Localização do usuário</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-pink-400">Funcionalidades</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Navegação SPA (Single Page Application)</li>
              <li>• Design responsivo e moderno</li>
              <li>• Jogo da Senha interativo</li>
              <li>• Integração com APIs externas</li>
              <li>• Animações e transições CSS</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Hooks React Utilizados</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• useState - Gerenciamento de estado local</li>
              <li>• useEffect - Efeitos colaterais e ciclo de vida</li>
              <li>• Custom Hooks - Lógica reutilizável</li>
              <li>• Event Handlers - Manipulação de eventos</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">Arquitetura do Projeto</h3>
          <p className="text-gray-300 text-center leading-relaxed">
            Este portfólio foi desenvolvido como uma Single Page Application (SPA) usando React com componentes funcionais.
            A navegação é controlada por estado interno, as APIs são consumidas de forma assíncrona, e o design utiliza
            gradientes modernos com glassmorphism para uma experiência visual premium.
          </p>
        </div>
      </div>
    </div>
  );

  const AcademicPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Experiência Acadêmica
        </h2>

        <div className="space-y-6">
          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <GraduationCap size={48} className="text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-400">Curso Superior Tecnólogo - Sistemas para Internet</h3>
                <p className="text-xl text-gray-300 mb-2">Universidade Católica de Pernambuco</p>
                <p className="text-gray-400 mb-4">2024 - 2026</p>
                <p className="text-gray-300 leading-relaxed">
                  Formação sólida em algoritmos, estruturas de dados, engenharia de software, banco de dados,
                  redes de computadores e inteligência artificial. Desenvolveu projetos práticos em diversas
                  linguagens de programação e participou de grupos de pesquisa em machine learning.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <Code size={48} className="text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-green-400">Curso de Desenvolvimento Web Full Stack</h3>
                <p className="text-xl text-gray-300 mb-2">Rocketseat</p>
                <p className="text-gray-400 mb-4">2023</p>
                <p className="text-gray-300 leading-relaxed">
                  Bootcamp intensivo focado em tecnologias modernas: React, Node.js, TypeScript, banco de dados
                  relacionais e não-relacionais, deploy e DevOps. Desenvolvimento de projetos reais com
                  metodologias ágeis.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <User size={48} className="text-pink-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-pink-400">Certificações e Cursos Complementares</h3>
                <div className="space-y-3 mt-4">
                  <div>
                    <p className="text-gray-300 font-semibold">AWS Certified Solutions Architect</p>
                    <p className="text-gray-400">Amazon Web Services - 2023</p>
                  </div>
                  <div>
                    <p className="text-gray-300 font-semibold">Google Analytics Certified</p>
                    <p className="text-gray-400">Google - 2023</p>
                  </div>
                  <div>
                    <p className="text-gray-300 font-semibold">Scrum Master Certified</p>
                    <p className="text-gray-400">Scrum Alliance - 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Principais Disciplinas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Programação</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Algoritmos e Estruturas de Dados</li>
                  <li>• Programação Orientada a Objetos</li>
                  <li>• Programação Funcional</li>
                  <li>• Desenvolvimento Web</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">Sistemas</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Sistemas Operacionais</li>
                  <li>• Redes de Computadores</li>
                  <li>• Banco de Dados</li>
                  <li>• Engenharia de Software</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfessionalPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Experiência Profissional
        </h2>

        <div className="space-y-6">
          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <Briefcase size={48} className="text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-400">Desenvolvedor Full Stack Sênior</h3>
                <p className="text-xl text-gray-300 mb-2">TechCorp Solutions</p>
                <p className="text-gray-400 mb-4">Janeiro 2023 - Presente</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Liderança técnica em projetos de grande escala, desenvolvimento de arquiteturas escaláveis
                  e mentoria de desenvolvedores júnior. Responsável por implementar boas práticas de código
                  e otimização de performance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">React</span>
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">Node.js</span>
                  <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">PostgreSQL</span>
                  <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">AWS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <Code size={48} className="text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-green-400">Desenvolvedor Frontend</h3>
                <p className="text-xl text-gray-300 mb-2">Digital Innovations Ltd.</p>
                <p className="text-gray-400 mb-4">Março 2021 - Dezembro 2022</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Desenvolvimento de interfaces modernas e responsivas para aplicações web. Colaboração direta
                  com designers UX/UI e implementação de componentes reutilizáveis seguindo padrões de design system.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">Vue.js</span>
                  <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">JavaScript</span>
                  <span className="bg-pink-600 px-3 py-1 rounded-full text-sm">SASS</span>
                  <span className="bg-gray-600 px-3 py-1 rounded-full text-sm">Figma</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <User size={48} className="text-pink-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-pink-400">Estagiário de Desenvolvimento</h3>
                <p className="text-xl text-gray-300 mb-2">StartupTech</p>
                <p className="text-gray-400 mb-4">Agosto 2020 - Fevereiro 2021</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Primeiro contato profissional com desenvolvimento web. Participação em projetos de pequeno
                  e médio porte, aprendizado de metodologias ágeis e desenvolvimento de habilidades em equipe.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-red-600 px-3 py-1 rounded-full text-sm">HTML</span>
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">CSS</span>
                  <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">JavaScript</span>
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">Git</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Conquistas Profissionais</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Projetos Destacados</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• E-commerce com 50k+ usuários ativos</li>
                  <li>• Sistema de gestão empresarial</li>
                  <li>• Aplicativo mobile híbrido</li>
                  <li>• Plataforma de streaming de vídeo</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">Reconhecimentos</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Funcionário do mês (3x)</li>
                  <li>• Líder de equipe técnica</li>
                  <li>• Mentor de 5+ desenvolvedores</li>
                  <li>• Speaker em conferências tech</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Projetos Desenvolvidos
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "E-commerce Moderno",
              description: "Plataforma completa de vendas online com carrinho, pagamentos e painel administrativo.",
              tech: ["React", "Node.js", "MongoDB", "Stripe"],
              color: "from-blue-500 to-purple-500"
            },
            {
              title: "App de Delivery",
              description: "Aplicativo para delivery de comida com geolocalização e pagamento integrado.",
              tech: ["React Native", "Firebase", "Maps API"],
              color: "from-green-500 to-teal-500"
            },
            {
              title: "Dashboard Analytics",
              description: "Painel de controle com gráficos interativos e relatórios em tempo real.",
              tech: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
              color: "from-yellow-500 to-orange-500"
            },
            {
              title: "Sistema de Blog",
              description: "CMS completo para blogs com editor rich text e sistema de comentários.",
              tech: ["Next.js", "Tailwind", "Prisma", "MySQL"],
              color: "from-pink-500 to-red-500"
            },
            {
              title: "Chat em Tempo Real",
              description: "Aplicação de mensagens instantâneas com salas privadas e grupos.",
              tech: ["Socket.io", "Express", "Redis", "JWT"],
              color: "from-indigo-500 to-blue-500"
            },
            {
              title: "API RESTful",
              description: "API robusta para gerenciamento de usuários com autenticação e autorização.",
              tech: ["Node.js", "Express", "MongoDB", "Docker"],
              color: "from-gray-500 to-gray-700"
            }
          ].map((project, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className={`h-32 bg-gradient-to-r ${project.color}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors">
                    <Github size={16} />
                    <span className="text-sm">Código</span>
                  </button>
                  <button className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors">
                    <Eye size={16} />
                    <span className="text-sm">Demo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">Tecnologias Utilizadas</h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold text-blue-400">Frontend</h4>
              <p className="text-sm text-gray-300 mt-2">React, Vue, Angular, Next.js</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold text-green-400">Backend</h4>
              <p className="text-sm text-gray-300 mt-2">Node.js, Python, Express, FastAPI</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-400">Database</h4>
              <p className="text-sm text-gray-300 mt-2">MongoDB, PostgreSQL, Redis</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold text-pink-400">DevOps</h4>
              <p className="text-sm text-gray-300 mt-2">Docker, AWS, CI/CD, Git</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GamePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-orange-900 text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Jogo da Senha
        </h2>

        <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center text-yellow-400">Como Jogar</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2">Objetivo:</h4>
              <p className="mb-4">Descobrir a senha de 4 dígitos únicos em até 10 tentativas.</p>

              <h4 className="font-bold text-white mb-2">Bulls:</h4>
              <p>Dígitos corretos na posição correta.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Cows:</h4>
              <p className="mb-4">Dígitos corretos na posição errada.</p>

              <h4 className="font-bold text-white mb-2">Exemplo:</h4>
              <p>Senha: 1234, Tentativa: 1324<br />
                Resultado: 2 Bulls, 2 Cows</p>
            </div>
          </div>
        </div>

        {!gameOver ? (
          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm mb-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={gameGuess}
                  onChange={(e) => setGameGuess(e.target.value)}
                  placeholder="Digite 4 dígitos únicos"
                  maxLength="4"
                  className="px-4 py-3 text-2xl text-center bg-white bg-opacity-20 rounded-lg border-2 border-white border-opacity-30 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-400"
                />
                <button
                  onClick={makeGuess}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Tentar
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={initGame}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  <RefreshCw size={16} />
                  <span>Novo Jogo</span>
                </button>

                <button
                  onClick={() => alert(`A senha é: ${gameSecret}`)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                >
                  <Eye size={16} />
                  <span>Ver Senha</span>
                </button>
              </div>

              <p className="text-gray-300">
                Tentativas restantes: {10 - gameAttempts.length}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm mb-8 text-center">
            <div className="mb-4">
              {gameWon ? (
                <div className="text-green-400">
                  <h3 className="text-3xl font-bold mb-2">🎉 Parabéns! 🎉</h3>
                  <p className="text-xl">Você descobriu a senha {gameSecret} em {gameAttempts.length} tentativas!</p>
                </div>
              ) : (
                <div className="text-red-400">
                  <h3 className="text-3xl font-bold mb-2">😔 Game Over</h3>
                  <p className="text-xl">A senha era: {gameSecret}</p>
                </div>
              )}
            </div>

            <button
              onClick={initGame}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 mx-auto"
            >
              <RefreshCw size={20} />
              <span>Novo Jogo</span>
            </button>
          </div>
        )}

        {gameAttempts.length > 0 && (
          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">Histórico de Tentativas</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {gameAttempts.map((attempt, index) => (
                <div key={index} className="flex justify-between items-center bg-white bg-opacity-10 p-4 rounded-lg">
                  <span className="text-lg font-mono">#{attempt.attempt}: {attempt.guess}</span>
                  <div className="flex space-x-4">
                    <span className="text-green-400 font-bold">
                      🎯 {attempt.bulls} Bulls
                    </span>
                    <span className="text-yellow-400 font-bold">
                      🐄 {attempt.cows} Cows
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'academic': return <AcademicPage />;
      case 'professional': return <ProfessionalPage />;
      case 'projects': return <ProjectsPage />;
      case 'game': return <GamePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {renderCurrentPage()}
    </div>
  );
};

export default Portfolio;