import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description: "The reading list — either read, in the works, or next up.",
};

type Shelf = { section: string; books: [string, string][] };

const shelves: Shelf[] = [
  {
    section: "Fiction",
    books: [
      [
        "The Great Alone",
        "Follows a mother and daughter as they struggle to survive both the brutal, unforgiving Alaskan wilderness and the increasingly volatile mental state of the family patriarch.",
      ],
      [
        "Sula",
        "Explores the intense, complex friendship between two Black women in a small Ohio town, examining how their differing paths—one of conformity and one of fierce independence—challenge societal norms and the boundaries of loyalty.",
      ],
    ],
  },
  {
    section: "Non-fiction",
    books: [
      [
        "Dopamine Nation: Finding Balance in the Age of Indulgence",
        "Explores the neuroscience of addiction and pleasure, explaining how our modern \"overstimulated\" world disrupts our brain's balance and how finding a path back to moderation can lead to deeper satisfaction.",
      ],
    ],
  },
  {
    section: "Professional Development",
    books: [
      [
        "Emotional Intelligence 2.0",
        "Provides a practical, data-driven toolkit for measuring and improving your self-awareness and relationship management skills.",
      ],
      [
        "Deep Work",
        "Identifies the ability to focus without distraction on cognitively demanding tasks as the \"superpower of the 21st century,\" allowing you to produce higher-quality output faster than your peers.",
      ],
      [
        "So Good They Can't Ignore You",
        "Argues that \"following your passion\" is bad advice and that true career satisfaction comes from building \"career capital\"—rare and valuable skills—that give you the leverage to control your professional destiny.",
      ],
      [
        "Executive Presence: The Missing Link Between Merit and Success",
        "Identifies the three critical pillars—gravitas, communication, and appearance—that signal to others you have the \"right stuff\" to lead, bridging the gap between being good at your job and actually getting promoted.",
      ],
    ],
  },
  {
    section: "Sales Education",
    books: [
      [
        "The JOLT Effect",
        "Identifies that the biggest hurdle for new AEs isn't the \"status quo,\" but customer indecision—and teaches you how to use emotional intelligence to judge a buyer's fear of failure and move them to a \"yes.\"",
      ],
      [
        "Never Split the Difference: Negotiating As If Your Life Depended On",
        "Applies high-stakes FBI hostage negotiation tactics, like tactical empathy and calibrated questions, to help you achieve better outcomes in business without making unnecessary concessions.",
      ],
      [
        "Gap Selling",
        "Simplifies the sales process by focusing entirely on identifying the \"gap\" between a customer's current problem-state and their desired future-state, making the product the only logical bridge between the two.",
      ],
      [
        "Sales EQ: How Ultra High Performers Leverage Sales-Specific Emotional Intelligence to Close the Complex Deal",
        "Argues that in a world of automated processes and informed buyers, ultra-high performers win by mastering sales-specific emotional intelligence to control their own disruptive emotions and influence the psychological \"buying experience.\"",
      ],
      [
        "The Qualified Sales Leader: Proven Lessons from a Five Time CRO",
        "Provides a tactical blueprint for scaling sales organizations by mastering the MEDDICC framework and focusing on rigorous qualification to ensure \"miracles\" aren't the only way you hit your quota.",
      ],
    ],
  },
  {
    section: "Self Improvement",
    books: [
      [
        "The Let Them Theory",
        "Teaches that true emotional peace and power come from releasing the futile attempt to control others—allowing them to be exactly who they are—so you can focus entirely on your own reactions and choices.",
      ],
      [
        "Becoming Bulletproof: Protect Yourself, Read People, Influence Situations, and Live Fearlessly",
        "Draws on her experiences as a Secret Service agent to provide a toolkit for sharpening your intuition, reading body language, and building the mental \"armor\" needed to command any room and handle fear effectively.",
      ],
      [
        "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life",
        "Argues that a meaningful life is not about avoiding struggle or forced positivity, but about choosing better problems to solve and being ruthless about which values are actually worth your limited time and energy.",
      ],
      [
        "The Mountain Is You: Transforming Self-Sabotage Into Self-Mastery",
        "Recontextualizes self-sabotage as a subconscious coping mechanism, guiding readers to extract the wisdom from their internal resistance so they can stop being their own biggest obstacle and finally step into their potential.",
      ],
      [
        "The 7 Habits of Highly Effective People: 30th Anniversary Edition",
        "Provides a timeless framework for personal and professional effectiveness by shifting from dependence to independence (and ultimately interdependence) through principles like proactive responsibility and beginning with the end in mind.",
      ],
      [
        "It Takes What It Takes: How to Think Neutrally and Gain Control of Your Life",
        "Introduces the concept of neutral thinking, a high-performance mindset that prioritizes objective facts and the next immediate action over the emotional volatility of positive or negative framing.",
      ],
      [
        "The Garden Within: Where the War with Your Emotions Ends and Your Most Powerful Life Begins",
        "Integrates faith and neuroscience to show how embracing—rather than fighting—your emotions creates the fertile \"soil\" necessary for a resilient and flourishing life.",
      ],
      [
        "Good Vibes, Good Life: How Self-Love Is the Key to Unlocking Your Greatness",
        "How practicing self-love and raising your \"vibrational energy\" through positive habits and mindset shifts can help you manifest a life that aligns with your highest potential.",
      ],
      [
        "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        "How to transform your life by focusing on tiny, consistent adjustments and designing environments that make good habits inevitable and bad ones impossible.",
      ],
    ],
  },
];

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="py-10 md:py-14 border-b-2 border-ink">
        <p className="kicker text-accent mb-3">The Shelf</p>
        <h1 className="headline text-6xl md:text-8xl">Books</h1>
        <p className="mt-4 max-w-xl text-lg italic">
          Either read, in the works, or next up.
        </p>
      </div>
      {shelves.map((shelf) => (
        <section
          key={shelf.section}
          className="grid md:grid-cols-12 gap-6 py-10 border-b border-ink"
        >
          <h2 className="headline text-3xl md:col-span-3 text-accent">
            {shelf.section}
          </h2>
          <div className="md:col-span-9 grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {shelf.books.map(([title, blurb]) => (
              <div key={title}>
                <h3 className="headline text-xl leading-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  {blurb}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
