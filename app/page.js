'use client';
export default function Home() {
  const handleImport = () => {
    window.location.href = '/api/auth/google?userId=123';
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Importar contactos</h1>
      <button onClick={handleImport}>Importar</button>
    </div>
  );
}
