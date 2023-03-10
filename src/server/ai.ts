import { Configuration, OpenAIApi } from 'openai'
import { getPrompt } from './prompt'

const conf = new Configuration({
  apiKey: process.env.ZEN_HEART
})

export const openai = new OpenAIApi(conf)

export const completionOpt = {
  model: 'text-davinci-003',
  temperature: 0.8,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ['\n']
}

export const callComp = async (msgHis: string) => {
  const promptMsg = getPrompt(msgHis)
  console.log('>>> prompt', promptMsg)
  try {
    const resp = await openai.createCompletion({
      ...completionOpt,
      prompt: getPrompt(promptMsg)
    })
    console.log('<<< message', resp.data)
    try {
      return resp.data.choices[0].text
    } catch (e) {
      console.error(e)
      return '我没办法回答你'
    }
  } catch (e) {
    console.error(e)
    return '我好像出了点问题'
  }
}
