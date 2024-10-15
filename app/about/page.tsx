import Link from 'next/link';
import { Bungee_Shade } from '@next/font/google';

const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"] });

// Define the type for TimelineItem props
interface TimelineItemProps {
  icon: string;
  title: string;
  description: string;
  date: string;
}

// Array to hold timeline events
const timelineData: TimelineItemProps[] = [
  { icon: "💼", title: "Started working at Vayana", description: "Began my professional journey.", date: "July 2023" },
  { icon: "🎓", title: "Graduated from Ashoka University", description: "Earned a bachelor's degree.", date: "May 2023" },
  { icon: "🎓", title: "Graduated from Tagore International School", description: "Completed high school education.", date: "2018" },
];

// Group events by year
const groupedEvents = timelineData.reduce((acc, event) => {
  const year = event.date.split(' ')[1] || event.date;
  if (!acc[year]) acc[year] = [];
  acc[year].push(event);
  return acc;
}, {} as Record<string, TimelineItemProps[]>);

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[#011627] relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className={`${bungeeShade.className} text-3xl sm:text-6xl font-bold text-center my-12 relative`}>
          <span className="absolute inset-0 text-[#011627] z-10">Namaste</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #011627' }}>Namaste</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <nav className="flex justify-center space-x-4 mb-8">
            {['About', 'Likes', 'Uses', 'Support'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-[#b6244f] hover:underline">
                {item}
              </Link>
            ))}
          </nav>

          <section id="about" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-lg">
              I'm Sahil, a software engineer based in Delhi currently working in the blockchain space. I enjoy exploring new technologies and creating impactful software.
            </p>
          </section>

          <section id="timeline" className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Timeline</h2>
            {Object.keys(groupedEvents)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map((year) => (
                <div key={year} className="border-l-2 border-[#d47d6f] pl-4 mb-6">
                  <h3 className="text-xl font-bold mb-2">{year}</h3>
                  <ul className="space-y-4">
                    {groupedEvents[year].map((item, index) => (
                      <TimelineItem key={index} {...item} />
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}

// TimelineItem component with type annotations
function TimelineItem({ icon, title, description, date }: TimelineItemProps) {
  return (
    <li className="flex items-start">
      <span className="mr-2 text-2xl">{icon}</span>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </li>
  );
}
