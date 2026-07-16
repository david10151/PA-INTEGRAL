
$(function () {

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(el => new bootstrap.Popover(el));

  $(window).on('scroll', function () {
    $('.navbar').toggleClass('shadow', $(window).scrollTop() > 10);
  });

  function revealOnScroll() {
    $('.reveal').each(function () {
      const top = $(this).offset().top;
      const winBottom = $(window).scrollTop() + $(window).height() - 60;
      if (top < winBottom) {
        $(this).stop().animate({ opacity: 1 }, 500).addClass('is-visible');
      }
    });
  }
  $(window).on('scroll resize', revealOnScroll);
  
  revealOnScroll();

  $('.counter').each(function () {
    const $this = $(this);
    const target = parseInt($this.data('target'), 10) || 0;
    $({ n: 0 }).animate({ n: target }, {
      duration: 1600,
      easing: 'swing',
      step: function () { $this.text(Math.ceil(this.n).toLocaleString('es-PE')); },
      complete: function () { $this.text(target.toLocaleString('es-PE') + ($this.data('suffix') || '')); }
    });
  });

  $('#toggleSearch').on('click', function () {
    $('#searchBox').slideToggle(250);
  });

  $('.gallery-item').on('click', function () {
    const title = $(this).data('title') || 'Imagen';
    const imgSrc = $(this).data('img') || '';
    $('#lightboxLabel').text(title);
    const $lightboxImg = $('#lightboxImg');
    if (imgSrc) {
      $lightboxImg.attr('alt', title).show().attr('src', imgSrc);
    } else {
      $lightboxImg.hide().removeAttr('src');
    }
    const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    modal.show();
  });

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      e.stopPropagation();
      $(this).addClass('was-validated');
      return;
    }
    $(this).addClass('was-validated');
    const toastEl = document.getElementById('contactToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    this.reset();
    $(this).removeClass('was-validated');
  });

  document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

});
