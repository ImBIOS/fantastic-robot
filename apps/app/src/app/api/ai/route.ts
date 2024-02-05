// import { NextResponse, type NextRequest } from 'next/server'
// import { OpenAIStream, StreamingTextResponse } from 'ai'
// import { eq } from 'drizzle-orm'

// import { openai } from '~/lib/openai'
// import { ratelimitCheck } from '~/lib/ratelimit'
// import { db } from '~/server/db'
// import { users } from '~/server/db/schema'
// import { api } from '~/trpc/server'

// export const runtime = 'edge'

// export async function POST(req: NextRequest) {
//   await ratelimitCheck(req.ip)

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const { prompt } = await req.json()
//   const params = new URL(req.url).searchParams
//   const userId = params.get('userId') ?? ''
//   const withOption = params.get('withOption') === 'true' ? true : false

//   const classificationResponse = await openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     stream: false,
//     temperature: 0,
//     max_tokens: 300,
//     prompt: `klasifikasi text berikut : "${prompt}". hanya berikan jawaban dengan format json {"total":'jumlah soal (number)',"subject":'mata pelajaran (string and please translate this to english)',"grade":'untuk kelas berapa (example : 1st,3rd,9th - 12th',"topic":'tentang apa (string)'}, jika tidak ada topik yang berarti beri nilai 'Umum'. jika tidak ada grade beri nilai 'Umum', jika ada grade pastikan menambahkan angkanya`
//   })

//   const text = classificationResponse.choices[0]?.text

//   const {
//     grade = 'umum',
//     subject = 'umum',
//     topic = 'umum',
//     total = 0,
//     error = ''
//   } = ClassifyInstruction(text ?? '{}')

//   if (error) {
//     return new NextResponse(error, { status: 400 })
//   }
//   if (total > 25) {
//     return new NextResponse('(e)Jumlah soal maksimal 25')
//   }

//   const user = await db.query.users.findFirst({
//     where: eq(users.id, userId)
//   })

//   const totalToken = user?.token ?? 0

//   if (totalToken < total) {
//     return new NextResponse('(e)Token tidak cukup 😔')
//   }

//   await api.tokens.decrease.mutate(total)

//   // revalidateTag('totalToken')

//   let generateQuizPrompt = ''

//   if (withOption) {
//     generateQuizPrompt = `Please create ${total} ${subject} quiz questions prepare, the quiz for answer 4 choice, but dont give the option or the answer yet. suitable for ${grade}-grade students in Indonesia. Use curriculum of Indonesian k-13 of curriculum education. the topic is "${topic}". Use Indonesian language for the questions. Format the quiz in the following way: Begin each question with '(q)' to denote the question, and follow each question with '(stop)' to indicate a stop before the next question.`
//   } else {
//     generateQuizPrompt = `Please create ${total} ${subject} quiz questions suitable for ${grade}-grade students in Indonesia. Use curriculum of Indonesian k-13 of curriculum education. the topic is "${topic}". Use Indonesian language for the questions. Format the quiz in the following way: Begin each question with '(q)' to denote the question, and follow each question with '(stop)' to indicate a stop before the next question.`
//   }

//   console.info(generateQuizPrompt)
//   const generateQuiz = await openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     stream: true,
//     temperature: 1,
//     max_tokens: 1000,
//     prompt: generateQuizPrompt
//   })

//   const stream = OpenAIStream(generateQuiz)

//   // await api.tokens.readTotal.revalidate()

//   return new StreamingTextResponse(stream)
// }

// function ClassifyInstruction(text: string) {
//   let Cgrade = ''
//   let Csubject = ''
//   let Ctopic = ''
//   let Ctotal = 0

//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const { grade, subject, topic, total } = JSON.parse(text ?? '{}')
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     Cgrade = grade
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     Csubject = subject
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     Ctopic = topic
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     Ctotal = total
//   } catch (error) {
//     return {
//       error: 'Gagal memproses instruksi, coba lagi'
//     }
//   }

//   return {
//     grade: Cgrade,
//     subject: Csubject,
//     topic: Ctopic,
//     total: Ctotal
//   }
// }
