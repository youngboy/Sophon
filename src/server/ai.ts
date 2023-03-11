import { Configuration, OpenAIApi } from 'openai'
import { getHisChats, questTemp, docTemp, analyzeTemp, supportTmp } from './prompt'
import { TabModel } from './routers/subRouters/tab.model'

const conf = new Configuration({
  apiKey: process.env.ZEN_HEART
})

export const openai = new OpenAIApi(conf)

export const completionOpt = {
  model: 'text-davinci-003',
  temperature: 0.85,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ['\n']
}

export const callComp = async (promptMsg: string) => {
  console.log('>>> prompt', promptMsg)
  // return '我没钱了，充点钱吧大哥'
  try {
    const resp = await openai.createCompletion({
      ...completionOpt,
      prompt: promptMsg
    })
    console.log('<<< message', resp.data)
    return (
      resp.data?.choices?.[0].text ||
      JSON.stringify({
        response: '[ai:openAI 返回有点问题, 可能是没钱了]',
        forwardToAI: 'NOT_SUPPORT',
        processedAI: 'END_PROCESS'
      })
    )
  } catch (e: any) {
    console.error(e?.message || e)
    return '[ai:我好像出了点问题, 可能是没钱了]'
  }
}

function getResponse(preRes: string) {
  try {
    const resp: {
      plot: any
      response: string
      forwardToAI: string
      processedAI: string
    } = JSON.parse(preRes)
    if (resp.response || resp.plot) {
      return {
        ...resp,
        forwardToAI: (resp.forwardToAI === 'NOT_SUPPORT' ? '' : resp.forwardToAI) || '',
        processedAI: (resp.processedAI === 'END_PROCESS' ? '' : resp.processedAI) || ''
      }
    }
  } catch (e) {
    // console.error(e)
  }
  return {
    response: preRes,
    forwardToAI: '',
    processedAI: ''
  }
}
export const DocAI = async (tab: TabModel, lastMsg: any, replacePending: boolean) => {
  const prompt = docTemp.replace(
    '{historyMessages}',
    getHisChats(tab.messages.filter((m, index) => index !== 0 && index !== tab.messages.length - 1))
  )

  const preRes = await callComp(prompt)
  return getResponse(preRes)
}

export const AnalyzeAI = async (tab: TabModel, lastMsg: any, replacePending: boolean) => {
  const prompt = analyzeTemp.replace(
    '{historyMessages}',
    getHisChats(tab.messages.filter((m, index) => index !== 0 && index !== tab.messages.length - 1))
  )

  const preRes = await callComp(prompt)
  return getResponse(preRes)
}

export const SupportAI = async (tab: TabModel, lastMsg: any, replacePending: boolean) => {
  const prompt = supportTmp.replace(
    '{historyMessages}',
    getHisChats(tab.messages.filter((m, index) => index !== 0 && index !== tab.messages.length - 1))
  )

  const preRes = await callComp(prompt)
  return getResponse(preRes)
}

export const GuideAI = async (tab: TabModel, lastMsg: any, replacePending: boolean) => {
  const prompt = questTemp
    .replace(
      '{historyMessages}',
      getHisChats(
        tab.messages.filter((m, index) => index !== 0 && index !== tab.messages.length - 1)
      )
    )
    .replace('{quest}', lastMsg?.props?.raw || lastMsg?.props?.children || '你好')

  const preRes = await callComp(prompt)
  return getResponse(preRes)
}

const AI_SUB_TASK: any = {
  SupportAI,
  DocAI,
  AnalyzeAI,
  GuideAI
}

export const ResponseAI = async (
  tab: TabModel,
  lastMsg: any,
  aiName: string,
  replacePending: boolean
) => {
  const respondAI = AI_SUB_TASK[aiName]
  const response = await respondAI(tab, lastMsg, replacePending)
  return response
}
