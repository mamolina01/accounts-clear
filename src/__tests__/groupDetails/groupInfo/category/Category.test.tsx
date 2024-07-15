import { render } from '@testing-library/react'
import { Category } from '@/components/groupDetails/groupInfo/category/Category'

describe('Category component', () => {
  it('renders category name and image correctly', () => {
    const categoryName = 'Food'
    const { getByText, getByAltText } = render(<Category category={categoryName} />)

    expect(getByText(/Food/i)).toBeInTheDocument()

    const categoryImage = getByAltText('Food')
    expect(categoryImage).toBeInTheDocument()
    expect(categoryImage.tagName).toBe('IMG')

    const expectedSrc = 'food.png'
    expect(categoryImage.getAttribute('src')).toContain(expectedSrc)
  })
})
