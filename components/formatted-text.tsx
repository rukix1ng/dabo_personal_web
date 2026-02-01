import React from 'react';

interface FormattedTextProps {
    text: string;
    className?: string;
}

/**
 * Component to render text with markdown-like formatting:
 * - **text** for bold
 * - \n for line breaks
 */
export function FormattedText({ text, className = '' }: FormattedTextProps) {
    // Split by double newlines to create paragraphs
    const paragraphs = text.split('\n\n');

    return (
        <div className={className}>
            {paragraphs.map((paragraph, pIndex) => {
                // Process bold text within each paragraph
                const parts: React.ReactNode[] = [];
                let lastIndex = 0;
                const boldRegex = /\*\*(.*?)\*\*/g;
                let match;

                while ((match = boldRegex.exec(paragraph)) !== null) {
                    // Add text before the bold part
                    if (match.index > lastIndex) {
                        parts.push(paragraph.substring(lastIndex, match.index));
                    }
                    // Add bold text
                    parts.push(
                        <strong key={`bold-${pIndex}-${match.index}`} className="font-bold">
                            {match[1]}
                        </strong>
                    );
                    lastIndex = match.index + match[0].length;
                }

                // Add remaining text
                if (lastIndex < paragraph.length) {
                    parts.push(paragraph.substring(lastIndex));
                }

                // Handle single newlines within paragraph
                const processedParts = parts.map((part, index) => {
                    if (typeof part === 'string') {
                        const lines = part.split('\n');
                        return lines.map((line, lineIndex) => (
                            <React.Fragment key={`line-${pIndex}-${index}-${lineIndex}`}>
                                {line}
                                {lineIndex < lines.length - 1 && <br />}
                            </React.Fragment>
                        ));
                    }
                    return part;
                });

                return (
                    <p
                        key={`para-${pIndex}`}
                        className={pIndex < paragraphs.length - 1 ? 'mb-4' : ''}
                    >
                        {processedParts}
                    </p>
                );
            })}
        </div>
    );
}
