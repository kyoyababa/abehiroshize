'use strict';

const $ = require('jquery');

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  const documentTitle = $(document).find('title').text();
  const navigationId = 'abehiroshize-navigation';
  const navigationInnerListId = 'abehiroshize-list';
  const contentId = 'abehiroshize-content';


  function removeExistingStyles() {
    const $styleElements = $('style');
    const $stylesheetElements = $('link[rel="stylesheet"]');
    const $cssElements = $('link[type="text/css"]')

    $styleElements.remove();
    $stylesheetElements.remove();
    $cssElements.remove();
    $('*').removeAttr('style');
  }


  function createNavigation() {
    if ($('body').length === 0) {
      $('<body></body>').insertAfter('head');
    }

    $('<div></div>', { 'id': navigationId }).prependTo('body');

    $(`#${navigationId}`).append(`<ul id="${navigationInnerListId}"></ul>`);
    $('ul').each(function() {
      if ($(this).closest('main').length === 0) {
        $(this).find('li').appendTo(`#${navigationInnerListId}`);
      }
    });
  }


  function createContents() {
    $('<div></div>', { 'id': contentId }).insertAfter(`#${navigationId}`);

    if ($('h1').length > 0) {
      $('h1').remove();
    }

    $(`<h1>${documentTitle}のホームページ</h1>`).appendTo(`#${contentId}`);

    $(`#${contentId} ~ *`).appendTo(`#${contentId}`);
  }


  function adjustStyles() {
    const navigationWidth = '300px';

    $('head').append(`
      <link href="https://fonts.googleapis.com/css?family=Pinyon+Script" rel="stylesheet">

      <style>
        body {
          display: flex;
          margin: 0;
          font-family: monospace;
        }

        #${navigationId} {
          width: ${navigationWidth};
          min-height: 100vh;
          padding: 60px 20px;
          background-color: #F0F0FF;
        }

        #${navigationInnerListId} > li + li {
          margin-top: 40px;
        }

        #${contentId} {
          position: relative;
          width: calc(100vw - ${navigationWidth});
          min-height: 100vh;
          padding: 60px 100px;
          background-color: #FFFFFD;
        }

        #${contentId}:before {
          content: '${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}　　${documentTitle}';
          z-index: 0;
          position: fixed;
          top: 20px;
          right: 20px;
          left: calc(${navigationWidth} + 20px);
          font-size: 70px;
          font-family: 'Pinyon Script', cursive;
          word-break: break-all;
          color: #D3F6E0;
        }

        body > #${navigationId} *,
        body > #${contentId} * {
          z-index: 1 !important;
          position: relative !important;
          top: inherit !important;
          right: inherit !important;
          bottom: inherit !important;
          left: inherit !important;
        }

        #${contentId} > h1:first-child {
          text-align: center;
        }

        #${contentId} > h1:first-child > img {
          max-width: 50vw;
        }
      </style>
    `);
  }


  function abehiroshize() {
    $.when(
      $.when(
        removeExistingStyles()

      ).done(function() {
        createNavigation();
        createContents();
      })

    ).done(function() {
      adjustStyles();
    });
  }


  abehiroshize();
});
