import Card from '../../common/Card';

export default function BranchAbout({ title, description, highlightText }) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-slate-900 mb-3">{title}</h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        {description}
      </p>
      {highlightText && (
        <p className="text-sm text-slate-500 leading-relaxed">
          {highlightText}
        </p>
      )}
    </Card>
  );
}