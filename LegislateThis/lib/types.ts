export interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
    className?: string
  }
  
  export interface SortDropdownProps {
    value: string
    onSort: (option: string) => void
    className?: string
  }
  
  export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
  } 