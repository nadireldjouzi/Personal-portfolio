import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'public', 'cv.pdf')

function esc(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

const ops = []
function text(str, size, x, y, font = 'F1') {
  ops.push(`BT /${font} ${size} Tf ${x} ${y} Td (${esc(str)}) Tj ET`)
}
function rule(y) {
  ops.push(`${y} m 540 ${y} l S`)
}

text('Nadir Eldjouzi', 26, 72, 720, 'F2')
text('Ingénieur Systèmes Informatiques — Développeur Full-Stack & Systèmes', 12, 72, 696)
text('Email : nadironadiro44@gmail.com   |   GitHub : github.com/nadir-eldjouzi', 10, 72, 680)
text('LinkedIn : linkedin.com/in/nadir-eldjouzi   |   Tizi-Ouzou, Algérie', 10, 72, 666)
rule(656)

let y = 630
function section(title) {
  text(title, 13, 72, y, 'F2')
  y -= 18
}
function entry(str, indent = 0) {
  text('- ' + str, 10, 72 + indent, y)
  y -= 14
}

section('FORMATION')
entry('Master Systèmes Informatiques — UMMTO (2023-2025) : réseaux & NTIC, systèmes répartis, big data, IA')
entry('Licence en Informatique — UMMTO (2020-2023) : algorithmique, programmation, systèmes, réseaux')
entry('Formations complémentaires : Cisco CCNA, développement full-stack, UI/UX')

y -= 8
section('COMPÉTENCES')
entry('Réseaux & Sécurité : routage, DHCP, DNS (BIND9), pare-feux, VPN, détection d’intrusion')
entry('Systèmes & Architecture : Linux/Windows, temps réel, CORBA, Web Services, J2EE, P2P, ARM/FPGA')
entry('Données & IA : BD avancées (objet, spatiales, XML), Big Data, NoSQL, cloud, systèmes experts')
entry('Développement & Web : Java, C/C++, C#, PHP, Python, SQL, programmation web, génie logiciel')
entry('Gestion de projet : méthodes de développement, rédaction scientifique, anglais professionnel')

y -= 8
section('PROJETS')
entry('Plateforme e-commerce : React, Node.js, PostgreSQL, Stripe')
entry('Système de gestion scolaire : Next.js, TypeScript, MongoDB, Socket.io')
entry('Infrastructure réseau d’entreprise : VLAN, pare-feu, VPN, supervision')
entry('Services web répartis : Go, Docker, Redis, microservices, CI/CD')

y -= 8
section('CONTACT')
entry('Disponible pour stage PFE, alternance et premier emploi')

const content = ops.join('\n')
const stream = `q\n1 0 0 1 0 0 cm\n0.90 0.95 1.00 rg 0 0 612 792 re f\n0 0 0 rg 0.5 w\n${content}\nQ`

const objects = []
objects.push('<< /Type /Catalog /Pages 2 0 R >>')
objects.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
objects.push(
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>'
)
objects.push(
  `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`
)
objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')

let pdf = '%PDF-1.4\n'
const offsets = [0]
objects.forEach((obj, i) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'))
  pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
})
const xrefStart = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, pdf, 'latin1')
console.log(`CV generated: ${outPath}`)
