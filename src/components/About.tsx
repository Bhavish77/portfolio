"use client";

import { motion } from "motion/react";
import { Code2, Database, Layout, Server, Sparkles, Terminal } from "lucide-react";

export default function About() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout className="text-violet-400" size={24} />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
      description: "Crafting beautiful, responsive, and highly interactive user interfaces.",
    },
    {
      title: "Backend Engineering",
      icon: <Server className="text-fuchsia-400" size={24} />,
      skills: ["Python", "FastAPI", "Node.js", "Express", "RESTful APIs"],
      description: "Designing scalable server architectures, routing, and APIs.",
    },
    {
      title: "Databases & Systems",
      icon: <Database className="text-indigo-400" size={24} />,
      skills: ["PostgreSQL", "SQLite", "MongoDB", "Prisma", "SQLAlchemy"],
      description: "Designing efficient database schemas, query optimization, and management.",
    },
    {
      title: "Tools & DevOps",
      icon: <Code2 className="text-emerald-400" size={24} />,
      skills: ["Git & GitHub", "Docker", "Vercel", "Linux", "npm / pip"],
      description: "Managing version control, containerization, and continuous deployment workflows.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-mono mb-4">
            <Sparkles size={12} />
            <span>Biography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-12 h-1 bg-violet-500 rounded mt-4" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Biography text */}
          <div className="lg:col-span-2 space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              I am a passionate software engineer specializing in building high-fidelity web applications. My journey started with building interactive frontend layouts and expanded into crafting robust python-driven backend frameworks.
            </p>
            <p>
              I enjoy solving complex problems and turning designs into clean, performant code. I leverage modern frameworks like Next.js alongside styling paradigms like Tailwind CSS and shadcn/ui to build interfaces that feel premium.
            </p>
            <p>
              When I&apos;m not writing code, I enjoy exploring new technologies, refining my dev workflows, and designing micro-interactions that make web experiences feel responsive and alive.
            </p>
          </div>

          {/* Quick info card */}
          <div className="p-6 rounded-2xl border border-border/40 bg-neutral-900/50 backdrop-blur-sm relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl font-bold text-neutral-200 mb-4 flex items-center gap-2">
              <Terminal size={18} className="text-violet-500" />
              Quick Stats
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-border/20 pb-2">
                <span className="text-neutral-500">Location</span>
                <span className="text-neutral-300 font-medium">India</span>
              </li>
              <li className="flex justify-between border-b border-border/20 pb-2">
                <span className="text-neutral-500">Work Mode</span>
                <span className="text-neutral-300 font-medium">Full-time / Remote</span>
              </li>
              <li className="flex justify-between border-b border-border/20 pb-2">
                <span className="text-neutral-500">Experience</span>
                <span className="text-neutral-300 font-medium">2+ Years</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Specialty</span>
                <span className="text-violet-400 font-medium">Full-Stack Development</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl border border-border/40 bg-neutral-900/30 hover:border-violet-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-950 flex items-center justify-center border border-border/40 group-hover:border-violet-500/20 transition-colors duration-300">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-200 group-hover:text-violet-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{category.description}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-neutral-950 border border-border/40 text-neutral-400 text-xs font-mono hover:text-foreground hover:border-violet-500/30 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
