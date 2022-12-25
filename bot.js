const {Telegraf} = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)

const imp = {
    replyDb: -1001608248942,
    pzone: -1001352114412,
    prem_channel: -1001470139866,
    local_domain: 't.me/rss_shemdoe_bot?start=',
    prod_domain: 't.me/ohmychannelV2bot?start=',
    shemdoe: 741815228,
    halot: 1473393723,
    sh1xbet: 5755271222,
    xzone: -1001740624527,
    ohmyDB: -1001586042518,
    xbongo: -1001263624837,
    mylove: -1001748858805
}

bot.start(async ctx=> {
    await ctx.reply('welcome')
    .catch((err)=> ctx.reply(err.message).catch((err)=> console.log(err)))
})


bot.on('inline_query', async ctx => {
    try {
        let qry = ctx.inlineQuery

        let amnt = Number(qry.query.split('-')[0])
        let final = amnt * 0.95
        let fee = amnt - final
        let id1x = qry.query.split('-')[1]

        let results = [
            {
                type: 'article',
                id: `${Math.random() * 999999}`,
                title: 'Deposit tax',
                input_message_content: {
                    message_text: `Customer ID: ${id1x} \nAmount: ${amnt.toLocaleString('en-us')} TZS \nFee (5%): ${fee.toLocaleString('en-us')} TZS \nFinal deposited amount: ${final.toLocaleString('en-us')} TZS`
                }
            },
            {
                type: 'article',
                id: `${Math.random() * 999999}`,
                title: 'Withdraw tax',
                input_message_content: {
                    message_text: `Customer ID: ${id1x} \nAmount to Withdraw: ${amnt.toLocaleString('en-us')} TZS \nWithholding Tax (5%): ${fee.toLocaleString('en-us')} TZS \nAfter-tax Amount: ${final.toLocaleString('en-us')} TZS \n\n<b>Note:</b> <i>Withdraw request can take up to 3 hours to be completed.</i>`
                },
                parse_mode: 'HTML'
            }
        ]

        await ctx.answerInlineQuery(results)

    } catch (err) {
        console.log(err.message)
    }
})


bot.launch()
    .then((console.log('Bot is running')))
    .catch((err) => {
        console.log('Bot is not running')
    })


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

process.on('unhandledRejection', (reason, promise) => {
    bot.telegram.sendMessage(imp.shemdoe, reason + ' It is an unhandled rejection.')
    console.log(reason)
    //on production here process will change from crash to start cools
})

//caught any exception
process.on('uncaughtException', (err) => {
    console.log(err)
    bot.telegram.sendMessage(741815228, err.message + ' - It is ana uncaught exception.')
        .catch((err) => {
            console.log(err.message + ' while sending you')
            process.exit()
        })
})