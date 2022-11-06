#! /usr/bin/env node

// Import commander
const { Command } = require('commander');
const figlet = require("figlet");
const { translate } = require("@vitalets/google-translate-api");

const program = new Command();

figlet('translator-cli', function (err, data) {
    console.log(data)
});

translate('je parle anglais', { from: 'fr', to: 'en' })
    .then(res => {
        console.log(res.text);
        //=> I speak English
    }).catch(err => {
        console.error(err);
    });

// Declare program name and description
program
    .name('translate-cli')
    .description('CLI to translate among different languages.')
    .version('0.1.0');

// Help options
program.command('translate')
    .description('Translate a sentence into another language')
    .argument('<foreign_language>', 'Language to translate into')
    .argument('<sentence>', 'Sentence to translate')
    .action((foreign_language, sentence) => {
        translate(sentence, { to: foreign_language }).then(res => {
            console.log(res.text);
        }).catch(err => {
            console.error(err);
        });
    })

program.parse();