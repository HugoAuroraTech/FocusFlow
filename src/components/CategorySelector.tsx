import { useState } from 'react';
import { ChevronDown, Plus, Tag } from 'lucide-react';

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
  existingCategories: string[];
}

export function CategorySelector({ value, onChange, existingCategories }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  const defaultCategories = [
    'Trabalho',
    'Pessoal',
    'Estudos',
    'Casa',
    'Saúde',
    'Compras'
  ];
  
  // Combinar categorias padrão com existentes, removendo duplicatas
  const allCategories = Array.from(new Set([...defaultCategories, ...existingCategories]));
  
  const handleCategorySelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
    setIsCreatingNew(false);
    setNewCategoryInput('');
  };
  
  const handleCreateNew = () => {
    if (newCategoryInput.trim()) {
      onChange(newCategoryInput.trim());
      setIsOpen(false);
      setIsCreatingNew(false);
      setNewCategoryInput('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateNew();
    }
  };
  
  return (
    <div className="relative">
      {/* Input principal */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
      >
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || 'Selecione uma categoria'}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {/* Lista de categorias existentes */}
          <div className="py-1">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                  value === category ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Tag className="w-4 h-4" />
                {category}
              </button>
            ))}
          </div>
          
          {/* Divisor */}
          {allCategories.length > 0 && (
            <div className="border-t border-gray-200" />
          )}
          
          {/* Criar nova categoria */}
          <div className="p-2">
            {!isCreatingNew ? (
              <button
                onClick={() => setIsCreatingNew(true)}
                className="w-full px-3 py-2 text-left text-blue-600 hover:bg-blue-50 rounded flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Criar nova categoria
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nome da categoria"
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={handleCreateNew}
                  disabled={!newCategoryInput.trim()}
                  className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Overlay para fechar dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => {
            setIsOpen(false);
            setIsCreatingNew(false);
            setNewCategoryInput('');
          }}
        />
      )}
    </div>
  );
} 