
import React from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface LanguageFilterProps {
  languageFilter: string;
  setLanguageFilter: (filter: string) => void;
  languages: string[];
  languageNames: {[key: string]: string};
}

const LanguageFilter = ({ 
  languageFilter, 
  setLanguageFilter, 
  languages, 
  languageNames 
}: LanguageFilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 h-9 px-3"
        >
          <Languages size={16} />
          {languageNames[languageFilter] || languageFilter}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2">
        <div className="space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang}
              variant={languageFilter === lang ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setLanguageFilter(lang)}
            >
              {languageNames[lang] || lang}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageFilter;
