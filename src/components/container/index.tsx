/**
 * A standard content wrapper with white background, padding, 
 * and rounded corners. Use this for main page sections.
 * 
 * @example
 * <ContentContainer>
 *   <Typography variant="heading3">Section Title</Typography>
 *   <p>Section content goes here.</p>
 * </ContentContainer>
 */
const ContentContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md">{children}</div>
  );
};

export default ContentContainer;
