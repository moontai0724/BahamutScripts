// ==UserScript==
// @name         巴哈論壇文章簡易 MD 編輯器
// @namespace    https://home.gamer.com.tw/moontai0724
// @version      0.1
// @description  在巴哈姆特論壇發文區加上 Markdown 編輯器，十分簡易，且有轉換問題，請小心使用。
// @author       moontai0724
// @match        https://forum.gamer.com.tw/post*
// @supportURL   https://home.gamer.com.tw/creationDetail.php?sn=4587238
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://unpkg.com/stackedit-js@1.0.7/docs/lib/stackedit.min.js
// @require      https://unpkg.com/turndown/dist/turndown.js
// @license      MIT
// ==/UserScript==

(function (jQuery) {
    'use strict';

    (function initializeScript() {
        jQuery(".editor-toolbar").append(`<div class="top-editor__icongroup"><button id="MDE_initialize" class="editor-button" type="button">MD</button></div>`);
        jQuery("#MDE_initialize").on("click", event => {
            if (jQuery(".fe_source").hasClass("is-active"))
                bahaRte.toolbar.alternateView(!0);

            jQuery(event.target).addClass("is-active");
            openMDEditor();
        });
    })();

    function openMDEditor() {
        const stackedit = new Stackedit();

        stackedit.openFile({
            content: {
                text: new TurndownService().turndown(bahaRte.convertor.toHtml(bahaRte.getContent()))
            }
        });
        console.log(stackedit);

        stackedit.on("fileChange", file => {
            bahaRte.doc.body.innerHTML = file.content.html;
            bahaRte.utility.save();
        });

        stackedit.on("close", file => {
            jQuery("#MDE_initialize").removeClass("is-active");
        });
    }
})(jQuery);