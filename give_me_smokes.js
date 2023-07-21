// ==UserScript==
// @name         Torn: Give Me Smokes
// @namespace    billfrank85.give_me_smokes
// @version      0.0.1
// @description  Give Me Smokes!
// @author       billfrank85
// @match        https://www.torn.com/index.php
// @grant        none
// ==/UserScript==

function addButton() {
    if ($('div.content-title > h4').size() > 0 && $('#buySmokesBtn').size() < 1) {
        const button = `<button id="buySmokesBtn" style="color: var(--default-blue-color); cursor: pointer; margin-right: 0;">Give Me Smokes!</button>
                        <span id="buySmokesResult" style="font-size: 12px; font-weight: 100;"></span>`;
        $('div.content-title > h4').append(button);
        $('#buySmokesBtn').on('click', async () => {
            $('#buySmokesResult').text('');
            await getAction({
                type: 'post',
                action: 'shops.php',
                data: {
                    step: 'buyShopItem',
                    ID: 226,
                    amount: 29
                },
                success: (str) => {
                    try {
                        const msg = JSON.parse(str);
                        $('#buySmokesResult').html(msg.text).css('color', msg.success ? 'green' : 'red');
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        });
    }
};

(function() {
    'use strict';

    // Your code here...
    addButton();
})();
