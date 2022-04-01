export async function signIn({
  name,
  password
}: {
  name: string
  password: string
}): Promise<Response> {
  return await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password })
  })
}

export async function logout(): Promise<Response> {
  return await fetch('/api/auth', {
    method: 'DELETE'
  })
}
