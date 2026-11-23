import { useEffect, useState } from 'react'

export default function PanouStatistici() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [prag, setPrag] = useState('3')

  useEffect(() => {
    async function incarca() {
      try {
        const response = await fetch('http://localhost:3001/destinatii')

        if (!response.ok) {
          throw new Error(`Serverul a răspuns cu ${response.status}`)
        }

        const date = await response.json()
        setDestinatii(date)
      } catch (err) {
        setEroare(err.message)
      } finally {
        // greșeala 5: setIncarcare(false) era în try, deci la eșec
        // indicatorul rămânea pornit pentru totdeauna
        setIncarcare(false)
      }
    }

    incarca()
  }, [])

  if (incarcare) {
    return <p className="stare">Se încarcă statisticile...</p>
  }

  if (eroare) {
    return <p className="stare eroare">Statistici indisponibile: {eroare}</p>
  }

  // greșeala 3: era d.zile > Number(prag), iar „cel puțin" înseamnă >=
  const filtrate = destinatii.filter((d) => d.zile >= Number(prag))

  // greșeala 1: suma se făcea pe destinatii, nu pe filtrate
  const totalZile = filtrate.reduce((suma, d) => suma + d.zile, 0)
  const medie = filtrate.length === 0 ? 0 : totalZile / filtrate.length

  return (
    <section className="panou">
      <h2>Statistici</h2>

      <label>
        Cel puțin{' '}
        <input
          type="number"
          value={prag}
          /* greșeala 4: era onChange={setPrag}, care punea în stare
             obiectul event în loc de textul din câmp */
          onChange={(event) => setPrag(event.target.value)}
        />{' '}
        zile
      </label>

      {/* greșeala 2: era {filtrate.length && ...}, condiție nebooleană:
          cu patru destinații mesajul se afișa odată cu lista, iar cu zero
          pe ecran apărea cifra 0 */}
      {filtrate.length === 0 && (
        <p className="gol">Nicio destinație cu cel puțin {prag} zile.</p>
      )}

      {filtrate.length > 0 && (
        <ul>
          <li>Destinații: {filtrate.length}</li>
          <li>Total zile: {totalZile}</li>
          <li>Media: {medie.toFixed(1)} zile</li>
        </ul>
      )}
    </section>
  )
}
