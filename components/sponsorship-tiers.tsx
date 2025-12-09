"use client"

const tiers = [
  { name: "Bronze", amount: "$2,500", tone: "from-slate-700 to-slate-800" },
  { name: "Silver", amount: "$5,000", tone: "from-blue-700 to-indigo-700" },
  { name: "Gold", amount: "$8,000", tone: "from-amber-500 to-orange-500" },
  { name: "Platinum", amount: "$12,000", tone: "from-cyan-500 to-blue-600" },
  { name: "Partner", amount: "$20,000", tone: "from-purple-600 to-fuchsia-600" },
]

type Row = {
  label: string
  values: string[]
  group: "General" | "Recruiting" | "Branding"
}

const rows: Row[] = [
  { group: "General", label: "Mentors at Event", values: ["✓", "✓", "✓", "✓ Priority", "✓ Priority"] },
  { group: "General", label: "In-Person Booth", values: ["—", "✓", "✓ Premium", "✓ Premium", "✓ Premium"] },
  { group: "General", label: "Virtual Booth", values: ["✓", "✓", "✓", "✓", "✓"] },
  { group: "General", label: "Custom Prize Category", values: ["—", "—", "✓", "✓", "✓ Featured"] },
  { group: "General", label: "Host a Workshop/Tech Talk", values: ["—", "30 min", "60 min", "75 min", "75 min Featured"] },
  { group: "General", label: "Community Event Hosting", values: ["—", "—", "✓", "✓", "✓ Featured"] },
  { group: "Recruiting", label: "Recruiters at Event", values: ["—", "✓", "✓", "✓", "✓ Priority"] },
  { group: "Recruiting", label: "Resume Database", values: ["Post", "Post", "Pre & Post", "Pre & Post", "Pre & Post"] },
  { group: "Recruiting", label: "Schedule 1:1 Hacker Chats", values: ["—", "—", "✓", "✓", "✓ Priority"] },
  { group: "Recruiting", label: "Private Interview Room", values: ["—", "—", "✓", "✓", "✓"] },
  { group: "Recruiting", label: "Pre-Event Email Blast", values: ["—", "—", "✓", "✓", "✓ Featured"] },
  { group: "Branding", label: "Logo on Website & T-shirt", values: ["✓", "✓", "✓ Featured", "✓ Featured", "✓ Premium"] },
  { group: "Branding", label: "Social Media Shoutouts", values: ["✓", "✓", "✓", "✓ Priority", "✓ Premium"] },
  { group: "Branding", label: "Distribute Marketing Materials", values: ["—", "✓", "✓", "✓", "✓ Priority"] },
  { group: "Branding", label: "Opening Ceremony Speaking Slot", values: ["—", "1 min", "3 min", "5 min", "10 min + Featured"] },
  { group: "Branding", label: "Branded Mini-Challenge", values: ["—", "—", "✓", "✓ Featured", "✓ Premium"] },
  { group: "Branding", label: "“Co-Hosted by…”", values: ["—", "—", "—", "—", "Included"] },
]

export function SponsorshipTiers() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="relative overflow-hidden rounded-lg border border-primary/30 bg-card p-4 text-center shadow-sm"
          >
            <div className={`absolute inset-0 bg-linear-to-br ${tier.tone} opacity-15`} />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">{tier.name}</p>
              <p className="text-3xl font-bold mt-2 font-orbitron">{tier.amount}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-primary/30 bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-primary/10 text-left">
            <tr>
              <th className="p-3 font-mono text-muted-foreground">Benefits</th>
              {tiers.map((tier) => (
                <th key={tier.name} className="p-3 text-center font-orbitron text-foreground">
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const showGroup = idx === 0 || rows[idx - 1].group !== row.group
              return (
                <tr key={row.label} className="border-t border-primary/15 hover:bg-primary/5 transition-colors">
                  <td className="p-3 align-middle">
                    {showGroup && (
                      <div className="text-[11px] uppercase tracking-[0.2em] text-secondary font-mono mb-1">
                        {row.group}
                      </div>
                    )}
                    <div className="font-semibold text-foreground">{row.label}</div>
                  </td>
                  {row.values.map((value, i) => (
                    <td key={`${row.label}-${i}`} className="p-3 text-center font-mono text-foreground">
                      <Badge value={value} />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Badge({ value }: { value: string }) {
  if (value === "—") {
    return <span className="text-muted-foreground">—</span>
  }

  const variant =
    value.includes("Premium") || value.includes("Included")
      ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-100 border border-purple-400/40"
      : value.includes("Featured")
        ? "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-100 border border-amber-400/40"
        : value.includes("Priority")
          ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-100 border border-cyan-400/40"
          : "bg-primary/10 text-foreground border border-primary/20"

  return (
    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-semibold ${variant}`}>
      {value}
    </span>
  )
}
