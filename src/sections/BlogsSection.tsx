
import AnimatedSection from '@/components/AnimatedSection';
import { useBlogs } from '@/hooks/useBlogs';

const BlogsSection: React.FC = () => {
  const { data: items, isLoading, isError } = useBlogs();

  if (isLoading || isError || !items || items.length === 0) {
    return null;
  }

  return (
    <AnimatedSection id="blogs" className="py-16 bg-secondary/30">
      <div className="container max-w-content mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-8 relative">
            Blogs
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {items.map((item) => (
              <div
                key={`${item.title}-${item.displayOrder}`}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {item.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-muted-foreground mb-4 text-sm">
                      {item.description}
                    </p>
                  )}

                  {item.linkedInUrl && (
                    <a
                      href={item.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Read on LinkedIn &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BlogsSection;
