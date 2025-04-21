const horariosManha = [
    "07:30 - 08:20",
    "08:20 - 09:10",
    "09:10 - 10:00",
    "10:20 - 11:10",
    "11:10 - 12:00",
    "12:00 - 12:50"
  ];
  
  const horariosTarde = [
    "13:30 - 14:20",
    "14:20 - 15:10",
    "15:30 - 16:20",
    "16:20 - 17:10",
    "17:10 - 18:00"
  ];
  
  function gerarTabela(tabelaId, horarios) {
    const tbody = document.querySelector(`#${tabelaId} tbody`);
  
    horarios.forEach(horario => {
      const tr = document.createElement('tr');
  
      const tdHorario = document.createElement('td');
      tdHorario.textContent = horario;
      tdHorario.classList.add('horario');
      tr.appendChild(tdHorario);
  
      for (let i = 0; i < 5; i++) {
        const td = document.createElement('td');
        const inputTexto = document.createElement('input');
        inputTexto.type = "text";
        inputTexto.placeholder = "Turma";
        td.appendChild(inputTexto);
  
        // Clique com botão direito abre menu de cor
        td.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          abrirMenuCor(e, td);
        });
  
        tr.appendChild(td);
      }
  
      tbody.appendChild(tr);
    });
  }
  
  gerarTabela('tabela-manha', horariosManha);
  gerarTabela('tabela-tarde', horariosTarde);
  
  // Menu de cor
  const menuCor = document.getElementById('color-menu');
  let tdSelecionado = null;
  
  function abrirMenuCor(event, td) {
    tdSelecionado = td;
    menuCor.style.top = `${event.pageY}px`;
    menuCor.style.left = `${event.pageX}px`;
    menuCor.style.display = 'flex';
  }
  
  // Função para determinar a cor do texto com base na cor de fundo
  function corTextoContraste(corDeFundo) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = corDeFundo;
    const rgb = ctx.fillStyle.match(/\d+/g).map(Number);
    const [r, g, b] = rgb;
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);
    return luminancia > 150 ? '#000' : '#fff';
  }
  
  // Aplicar a cor na célula e no input
  document.querySelectorAll('.color-option').forEach(opcao => {
    opcao.addEventListener('click', () => {
      const cor = window.getComputedStyle(opcao).backgroundColor;
      if (tdSelecionado) {
        const input = tdSelecionado.querySelector('input');
        tdSelecionado.style.backgroundColor = cor;
        if (input) {
          input.style.backgroundColor = cor;
          input.style.color = corTextoContraste(cor);
        }
      }
      menuCor.style.display = 'none';
    });
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menuCor.contains(e.target)) {
      menuCor.style.display = 'none';
    }
  });
  
  // Exportar como imagem
  document.getElementById('exportar').addEventListener('click', () => {
    const container = document.getElementById('agenda-container');
  
    html2canvas(container).then(canvas => {
      const link = document.createElement('a');
      link.download = 'horario-semanal.jpeg';
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    });
  });
  