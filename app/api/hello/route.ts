export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}

export async function getLessons(){
  return await fetch('https://api.sampleapis.com/typer/typingLessons').then(response=>response.json())
}

export async function getLesson(id: string){
  return await fetch(`https://api.sampleapis.com/typer/typingLessons/${id}`).then(response=>response.json())

}