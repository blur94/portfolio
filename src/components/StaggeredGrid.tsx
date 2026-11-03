import { ProjectCard } from "@/components/ProjectCard";
import type { Work } from "@/lib/works";

interface StaggeredGridProps {
  works: Work[];
}

/**
 * StaggeredGrid: 3-column grid where even-indexed cards (1, 3, 5…) are
 * offset downward by 56px, creating a Notio-style staggered rhythm.
 */
export function StaggeredGrid({ works }: StaggeredGridProps) {
  return (
    <div className="grid items-start gap-8 md:grid-cols-3">
      {works.map((work, i) => (
        <div
          key={work.slug}
          className={i % 2 === 1 ? "md:mt-14" : undefined}
        >
          <ProjectCard work={work} />
        </div>
      ))}
    </div>
  );
}
