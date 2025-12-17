import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

/**
 * GET /api/cart/:userId
 * Get user's cart
 */
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.json({
                success: true,
                cart: [],
                count: 0
            });
        }

        res.json({
            success: true,
            cart: cart.items,
            count: cart.items.length
        });
    } catch (error) {
        console.error('Failed to fetch cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cart',
            error: error.message
        });
    }
});

/**
 * POST /api/cart/:userId/add
 * Add item to cart
 */
router.post('/:userId/add', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity = 1, variant = null } = req.body;

        console.log('🛒 Add to cart request:');
        console.log('   - userId:', userId);
        console.log('   - productId:', productId);
        console.log('   - quantity:', quantity);
        console.log('   - variant:', variant);

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        let cart = await Cart.findOne({ userId });
        console.log('   - Existing cart found:', cart ? 'YES' : 'NO');

        if (!cart) {
            // Create new cart
            cart = new Cart({
                userId,
                items: [{
                    productId,
                    quantity,
                    variant,
                    addedAt: new Date()
                }]
            });
            console.log('   - Creating new cart');
        } else {
            // Check if item already exists
            const existingItemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId &&
                    JSON.stringify(item.variant) === JSON.stringify(variant)
            );

            if (existingItemIndex > -1) {
                // Update quantity
                cart.items[existingItemIndex].quantity += quantity;
                console.log('   - Updated existing item quantity');
            } else {
                // Add new item
                cart.items.push({
                    productId,
                    quantity,
                    variant,
                    addedAt: new Date()
                });
                console.log('   - Added new item to cart');
            }
        }

        await cart.save();
        console.log('   - Cart saved successfully');

        await cart.populate('items.productId');
        console.log('   - Cart populated successfully');

        res.json({
            success: true,
            message: 'Item added to cart',
            cart: cart.items
        });
    } catch (error) {
        console.error('❌ Failed to add item to cart:', error);
        console.error('   Error details:', error.message);
        console.error('   Stack:', error.stack);
        res.status(500).json({
            success: false,
            message: 'Failed to add item to cart',
            error: error.message
        });
    }
});

/**
 * PUT /api/cart/:userId/update
 * Update cart item quantity
 */
router.put('/:userId/update', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity, variant = null } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId &&
                JSON.stringify(item.variant) === JSON.stringify(variant)
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        await cart.populate('items.productId');

        res.json({
            success: true,
            message: 'Cart updated',
            cart: cart.items
        });
    } catch (error) {
        console.error('Failed to update cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update cart',
            error: error.message
        });
    }
});

/**
 * DELETE /api/cart/:userId/remove/:productId
 * Remove item from cart
 */
router.delete('/:userId/remove/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { variant = null } = req.query;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const parsedVariant = variant ? JSON.parse(variant) : null;

        cart.items = cart.items.filter(
            item => !(item.productId.toString() === productId &&
                JSON.stringify(item.variant) === JSON.stringify(parsedVariant))
        );

        await cart.save();
        await cart.populate('items.productId');

        res.json({
            success: true,
            message: 'Item removed from cart',
            cart: cart.items
        });
    } catch (error) {
        console.error('Failed to remove item from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart',
            error: error.message
        });
    }
});

/**
 * DELETE /api/cart/:userId/clear
 * Clear entire cart
 */
router.delete('/:userId/clear', async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.json({
                success: true,
                message: 'Cart already empty',
                cart: []
            });
        }

        cart.items = [];
        await cart.save();

        res.json({
            success: true,
            message: 'Cart cleared',
            cart: []
        });
    } catch (error) {
        console.error('Failed to clear cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to clear cart',
            error: error.message
        });
    }
});

export default router;
